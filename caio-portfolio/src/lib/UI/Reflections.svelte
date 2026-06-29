<script>
    import { onMount, onDestroy } from 'svelte';
    import p5 from 'p5';

    /** @type {HTMLDivElement} */
    let reflectionsContainer;
    /** @type {p5} */
    let p5Instance;

    // Declaração de classes de suporte fora do onMount para otimização de performance
    class Beam {
        /**
         * @param {p5} p
         * @param {number} x
         * @param {number} y
         * @param {number} n
         * @param {Star[]} targets
         */
        constructor(p, x, y, n, targets) {
            this.pos = p.createVector(x, y);
            this.vel = p5.Vector.fromAngle(n * p.PI + p.PI / 6);
            this.pX = x;
            this.pY = y;
            this.targets = targets;
            this.acc = p.createVector(0, 0);
            this.colorOffset = p.random(50);
        }
        /** @param {p5} p */
        show(p) {
            p.stroke(245, 158 + this.colorOffset, 11, 45);
            p.line(this.pos.x, this.pos.y, this.pX, this.pY);
        }
        /** @param {p5} p */
        update(p) {
            this.pX = this.pos.x;
            this.pY = this.pos.y;
            this.calcForce(p);
            this.vel.add(this.acc);
            this.vel.limit(2.5);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
        /** @param {p5} p */
        calcForce(p) {
            for (let target of this.targets) {
                let dir = p5.Vector.sub(target.pos, this.pos);
                let dist = dir.mag();
                if (dist > 5) {
                    let forceMag = (250 * target.strength) / (dist * dist);
                    dir.setMag(forceMag);
                    this.acc.add(dir);
                }
            }

            // Força magnética induzida pelo cursor
            if (p.mouseY > p.height * 0.3) {
                let mouseVec = p.createVector(p.mouseX, p.mouseY);
                let mouseDir = p5.Vector.sub(mouseVec, this.pos);
                let mouseDist = mouseDir.mag();
                if (mouseDist < 80 && mouseDist > 2) {
                    let mouseForce = 1.2 * (1 - mouseDist / 80);
                    mouseDir.setMag(mouseForce);
                    this.acc.add(mouseDir);
                }
            }
        }
    }

    class Star {
        /**
         * @param {p5} p
         * @param {number} x
         * @param {number} y
         */
        constructor(p, x, y) {
            this.pos = p.createVector(x, y);
            this.strength = p.random(2, 8);
            this.noise = p.random(1000);
        }
        /** @param {p5} p */
        update(p) {
            let angle = p.noise(this.noise) * p.TWO_PI * 2;
            let step = p5.Vector.fromAngle(angle).mult(0.25);
            this.pos.add(step);
            this.noise += 0.005;
            this.pos.x = p.constrain(this.pos.x, 0, p.width);
            this.pos.y = p.constrain(this.pos.y, 0, p.height * 0.4);
        }
    }

    onMount(() => {
        if (!reflectionsContainer) return;

        /** @param {p5} p */
        const sketch = (p) => {
            /** @type {Beam[]} */
            let rays = [];
            /** @type {Star[]} */
            let stars = [];
            let sep = 4;
            let num = 4;

            p.setup = () => {
                p.createCanvas(reflectionsContainer.clientWidth, 192).parent(reflectionsContainer);
                p.background(6, 6, 8);
                p.strokeWeight(1);

                // Inicializar atratores
                for (let i = 0; i < num; i++) {
                    stars.push(new Star(p, p.random(p.width), p.random(p.height * 0.4)));
                }

                // Inicializar feixes de luz vertical
                for (let i = 0; i < p.width; i += sep) {
                    rays.push(new Beam(p, i, 0, p.noise(i / 150), stars));
                }
            };

            p.draw = () => {
                p.background(6, 6, 8, 35);

                for (let star of stars) {
                    star.update(p);
                    p.noStroke();
                    p.fill(245, 158, 11, 2);
                    p.circle(star.pos.x, star.pos.y, 45 + p.sin(p.frameCount * 0.05) * 10);
                    p.fill(245, 158, 11, 8);
                    p.circle(star.pos.x, star.pos.y, 25);
                    p.fill(255, 253, 230, 200);
                    p.circle(star.pos.x, star.pos.y, 4);
                }

                for (let i = rays.length - 1; i >= 0; i--) {
                    rays[i].show(p);
                    rays[i].update(p);

                    if (rays[i].pos.y > p.height || rays[i].pos.x < 0 || rays[i].pos.x > p.width) {
                        rays[i] = new Beam(p, p.random(p.width), 0, p.noise(p.frameCount / 200), stars);
                    }
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(reflectionsContainer.clientWidth, 192);
            };
        };

        p5Instance = new p5(sketch);
    });

    onDestroy(() => {
        if (p5Instance) p5Instance.remove();
    });
</script>

<div bind:this={reflectionsContainer} class="w-full h-full relative cursor-crosshair"></div>