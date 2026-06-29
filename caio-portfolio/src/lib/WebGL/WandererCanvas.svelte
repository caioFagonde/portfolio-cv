<script>
    import { onMount, onDestroy } from 'svelte';
    import { activeModule, layoutMode } from '../store.js';
    import * as THREE from 'three';

    /** @type {HTMLDivElement} */
    let containerElement;

    // Referências imperativas cruas typed as any para contornar restrições estritas do compilador
    /** @type {any} */
    let scene;
    /** @type {any} */
    let camera;
    /** @type {any} */
    let renderer;
    /** @type {any} */
    let terrainMesh;
    /** @type {any} */
    let constellationGroup;
    /** @type {any} */
    let forePeakMesh;
    /** @type {any} */
    let wandererGroup;
    
    let targetCameraPos = new THREE.Vector3(0, 5, 20);
    let targetLookAt = new THREE.Vector3(0, 0, 0);
    let defaultCamPos = new THREE.Vector3(0, 5, 20);
    let currentCameraPos = new THREE.Vector3().copy(defaultCamPos);
    let currentLookAt = new THREE.Vector3(0, 0, 0);
    
    /** @type {any[]} */
    let nodesList = [];
    /** @type {any[]} */
    let dataPackets = [];
    /** @type {any} */
    let animationFrameId;
    /** @type {any} */
    let resizeObserver;

    // Reatividade controlada
    $: if (scene && $activeModule) {
        adjustCameraTarget($activeModule);
    }

    $: if (renderer && $layoutMode) {
        triggerResize();
    }

    /** @param {string} moduleId */
    function adjustCameraTarget(moduleId) {
        if (moduleId === 'reentry') {
            targetCameraPos.set(6, 4, 15);
            targetLookAt.set(1.5, 0.5, -2);
        } else if (moduleId === 'alfred') {
            targetCameraPos.set(-7, 5, 12);
            targetLookAt.set(0.5, 1, 1);
        } else if (moduleId === 'landslide') {
            targetCameraPos.set(8, -1, 11);
            targetLookAt.set(-1, 0, 2);
        } else if (moduleId === 'potree') {
            targetCameraPos.set(-3, 7, 13);
            targetLookAt.set(0, -0.5, 0);
        } else if (moduleId === 'orbit') {
            targetCameraPos.set(3, 6, 14);
            targetLookAt.set(1, 1.5, -1.5);
        } else if (moduleId === 'forge') {
            targetCameraPos.set(-5, -0.5, 16);
            targetLookAt.set(0, 0, 1);
        }
    }

    function triggerResize() {
        setTimeout(() => {
            if (!containerElement || !renderer || !camera) return;
            const width = containerElement.clientWidth;
            const height = containerElement.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }, 550);
    }

    onMount(() => {
        if (!containerElement) return;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.035);

        camera = new THREE.PerspectiveCamera(50, containerElement.clientWidth / containerElement.clientHeight, 0.1, 1000);
        camera.position.copy(defaultCamPos);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
        containerElement.appendChild(renderer.domElement);

        // 1. "SEA OF FOG" MESHGRID TERRAIN
        const terrainGeo = new THREE.PlaneGeometry(100, 100, 50, 50);
        const terrainMat = new THREE.MeshBasicMaterial({
            color: 0x2e1150,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
            side: THREE.DoubleSide
        });
        terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
        terrainMesh.rotation.x = -Math.PI / 2;
        terrainMesh.position.y = -6;
        scene.add(terrainMesh);

        // 2. FOREGROUND "ROCKY PEAK"
        const peakGeo = new THREE.ConeGeometry(5, 8, 4, 4);
        const posAttr = peakGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            const y = posAttr.getY(i);
            if (y < 4) {
                posAttr.setX(i, posAttr.getX(i) + (Math.random() - 0.5) * 1.5);
                posAttr.setZ(i, posAttr.getZ(i) + (Math.random() - 0.5) * 1.5);
            }
        }
        peakGeo.computeVertexNormals();

        const peakMat = new THREE.MeshBasicMaterial({
            color: 0x141417,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        forePeakMesh = new THREE.Mesh(peakGeo, peakMat);
        forePeakMesh.position.set(0, -3.5, 4);
        scene.add(forePeakMesh);

        // 3. THE WANDERER
        wandererGroup = new THREE.Group();
        /** @type {any} */
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true }));
        head.position.y = 1.3;
        wandererGroup.add(head);

        /** @type {any} */
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.25, 0.8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8 }));
        body.position.y = 0.7;
        wandererGroup.add(body);

        /** @type {any} */
        const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.4, 4), new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
        staff.position.set(0.25, 0.6, 0.1);
        staff.rotation.z = -0.15;
        wandererGroup.add(staff);

        wandererGroup.position.set(0, 0.5, 4);
        scene.add(wandererGroup);

        // 4. FLOATING CONSTELLATIONS & GEOMETRIES
        constellationGroup = new THREE.Group();
        scene.add(constellationGroup);

        const modulesConfig = [
            { id: 'reentry', shape: 'octahedron', pos: new THREE.Vector3(7, 3, -1) },
            { id: 'alfred', shape: 'torus', pos: new THREE.Vector3(-6, 4, 1) },
            { id: 'landslide', shape: 'dodecahedron', pos: new THREE.Vector3(6, -2, 5) },
            { id: 'potree', shape: 'tetrahedron', pos: new THREE.Vector3(-4, 3, -3) },
            { id: 'orbit', shape: 'sphere', pos: new THREE.Vector3(2, 5, -6) }
        ];

        modulesConfig.forEach((cfg) => {
            let geo;
            if (cfg.shape === 'octahedron') geo = new THREE.OctahedronGeometry(0.7, 0);
            else if (cfg.shape === 'torus') geo = new THREE.TorusGeometry(0.4, 0.15, 6, 12);
            else if (cfg.shape === 'dodecahedron') geo = new THREE.DodecahedronGeometry(0.7, 0);
            else if (cfg.shape === 'tetrahedron') geo = new THREE.TetrahedronGeometry(0.75, 0);
            else geo = new THREE.SphereGeometry(0.5, 12, 12);

            const mat = new THREE.MeshBasicMaterial({
                color: 0x52525b,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });

            /** @type {any} */
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(cfg.pos);
            constellationGroup.add(mesh);

            const points = [new THREE.Vector3(0, 0.5, 4), cfg.pos];
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
            const lineMat = new THREE.LineBasicMaterial({
                color: 0x27272a,
                transparent: true,
                opacity: 0.4
            });
            const line = new THREE.Line(lineGeo, lineMat);
            constellationGroup.add(line);

            nodesList.push({
                id: cfg.id,
                mesh: mesh,
                line: line,
                defaultColor: 0x52525b,
                activeColor: 0xa855f7,
                pos: cfg.pos,
                rotSpeed: new THREE.Vector3(Math.random() * 0.01 + 0.003, Math.random() * 0.01 + 0.003, 0)
            });
        });

        // Spark particles
        for (let i = 0; i < 15; i++) {
            const packetGeo = new THREE.SphereGeometry(0.04, 4, 4);
            const packetMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.7 });
            const packetMesh = new THREE.Mesh(packetGeo, packetMat);
            scene.add(packetMesh);
            
            const randomNode = nodesList[Math.floor(Math.random() * nodesList.length)];
            dataPackets.push({
                mesh: packetMesh,
                node: randomNode,
                progress: Math.random(),
                speed: Math.random() * 0.008 + 0.003
            });
        }

        // Starfield
        const starsGeo = new THREE.BufferGeometry();
        const starsCount = 200;
        const starsPos = new Float32Array(starsCount * 3);
        for (let i = 0; i < starsCount * 3; i++) {
            starsPos[i] = (Math.random() - 0.5) * 80;
        }
        starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
        const starsMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.06,
            transparent: true,
            opacity: 0.4
        });
        const starField = new THREE.Points(starsGeo, starsMat);
        scene.add(starField);

        resizeObserver = new ResizeObserver(() => triggerResize());
        resizeObserver.observe(containerElement);

        animate();
    });

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        const time = Date.now() * 0.0004;

        if (terrainMesh) {
            const posAttr = terrainMesh.geometry.attributes.position;
            const count = posAttr.count;
            for (let i = 0; i < count; i++) {
                const vx = posAttr.getX(i);
                const vy = posAttr.getY(i);
                const z = Math.sin(vx * 0.08 + time) * Math.cos(vy * 0.08 + time) * 1.5 +
                          Math.sin(vx * 0.03 - time * 0.4) * 0.8;
                posAttr.setZ(i, z);
            }
            terrainMesh.geometry.computeVertexNormals();
            posAttr.needsUpdate = true;
        }

        if (constellationGroup) {
            constellationGroup.rotation.y = time * 0.03;
        }

        nodesList.forEach(node => {
            node.mesh.rotation.x += node.rotSpeed.x;
            node.mesh.rotation.y += node.rotSpeed.y;

            if ($activeModule === node.id) {
                node.mesh.material.color.setHex(node.activeColor);
                node.line.material.color.setHex(node.activeColor);
                node.mesh.scale.set(1.4, 1.4, 1.4);
            } else {
                node.mesh.material.color.setHex(node.defaultColor);
                node.line.material.color.setHex(0x27272a);
                node.mesh.scale.set(1.0, 1.0, 1.0);
            }
        });

        dataPackets.forEach(p => {
            p.progress += p.speed;
            if (p.progress >= 1) {
                p.progress = 0;
            }
            const targetWorldPos = new THREE.Vector3();
            p.node.mesh.getWorldPosition(targetWorldPos);
            p.mesh.position.lerpVectors(new THREE.Vector3(0, 0.5, 4), targetWorldPos, p.progress);
        });

        if (camera) {
            currentCameraPos.lerp(targetCameraPos, 0.04);
            currentLookAt.lerp(targetLookAt, 0.04);
            camera.position.copy(currentCameraPos);
            camera.lookAt(currentLookAt);
        }

        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    onDestroy(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (resizeObserver) resizeObserver.disconnect();

        if (renderer) renderer.dispose();
        if (terrainMesh) {
            terrainMesh.geometry.dispose();
            terrainMesh.material.dispose();
        }
        nodesList.forEach(node => {
            node.mesh.geometry.dispose();
            node.mesh.material.dispose();
            node.line.geometry.dispose();
            node.line.material.dispose();
        });
    });
</script>

<div bind:this={containerElement} id="canvas-container" class="w-full h-full relative bg-brand-pitch"></div>