<script>
    import { onMount, onDestroy } from 'svelte';
    import { activeModule } from '../store.js';
    import p5 from 'p5';

    /** @type {HTMLDivElement} */
    let p5Container;
    /** @type {any} */
    let p5Instance;
    /** @type {any} */
    let unsubscribe;

    onMount(() => {
        if (!p5Container) return;

        /** @param {any} p */
        const sketch = (p) => {
            let n = 0;
            let currentModule = 'reentry';
            /** @type {any} */
            let colorPrimary;
            /** @type {any} */
            let colorSecondary;
            /** @type {any} */
            let colorTertiary;
            let speed = 1.5;

            p.setup = () => {
                p.createCanvas(p5Container.clientWidth, 140).parent(p5Container);
                p.angleMode(p.DEGREES);
                updateColors();

                // Assinatura interna reativa e direta da Store dentro do ciclo do p5.js
                unsubscribe = activeModule.subscribe(moduleId => {
                    currentModule = moduleId;
                    if (p.color) {
                        updateColors();
                    }
                });
            };

            p.draw = () => {
                p.background(5);
                p.translate(p.width / 2, p.height / 2);

                // Mostrador astronômico clássico de fundo (grade stippling)
                p.noFill();
                p.stroke(18, 18, 24);
                p.strokeWeight(1);
                p.circle(0, 0, 100);

                // Desenho das trajetórias orbitais
                if (colorPrimary) {
                    p.stroke(colorPrimary);
                }
                p.strokeWeight(1);
                p.ellipse(0, 0, 240, 90);

                // Linhas mecânicas amarelas de Kepler (snippet 2)
                for (let i = 0; i < 6; i++) {
                    let x0 = 45 * p.cos(n + 60 * i);
                    let y0 = 45 * p.sin(n + 60 * i);
                    let x1 = 45 * p.cos(n + 60 * (i + 1));
                    let y1 = 45 * p.sin(n + 60 * (i + 1));

                    if ((n > 93 && n < 216) || (n > 400 && n < 525) || (n > 709 && n < 835)) {
                        p.stroke(250, 204, 21, 200); 
                    } else {
                        p.stroke(250, 204, 21, 60); 
                    }
                    p.strokeWeight(1.2);
                    p.line(x0, y0, x1, y1);
                }

                // Vetores de projeção e ligação aos nós
                for (let i = 0; i < 6; i++) {
                    let x0 = 45 * p.cos(n + 60 * i);
                    let y0 = 45 * p.sin(n + 60 * i);

                    p.strokeWeight(0.6);
                    if (i < 2) {
                        let xLink = 120 * p.cos(90 + 120 * 1 - n / 6);
                        let yLink = 45 * p.sin(90 + 120 * 1 - n / 6);
                        if (colorPrimary) p.stroke(colorPrimary);
                        p.line(xLink, yLink, x0, y0);
                    } else if (i < 4) {
                        let xLink = 120 * p.cos(90 + 120 * 2 - n / 6);
                        let yLink = 45 * p.sin(90 + 120 * 2 - n / 6);
                        if (colorSecondary) p.stroke(colorSecondary);
                        p.line(xLink, yLink, x0, y0);
                    } else {
                        let xLink = 120 * p.cos(90 + 120 * 0 - n / 6);
                        let yLink = 45 * p.sin(90 + 120 * 0 - n / 6);
                        if (colorTertiary) p.stroke(colorTertiary);
                        p.line(xLink, yLink, x0, y0);
                    }

                    p.stroke(18, 18, 24);
                    if (colorPrimary) p.fill(colorPrimary);
                    p.strokeWeight(1);
                    p.circle(x0, y0, 6);
                }

                n = (n + speed) % 2160;
            };

            function updateColors() {
                if (currentModule === 'reentry') {
                    colorPrimary = p.color(244, 63, 94);
                    colorSecondary = p.color(168, 85, 247);
                    colorTertiary = p.color(251, 146, 60);
                    speed = 3.2;
                } else if (currentModule === 'alfred') {
                    colorPrimary = p.color(59, 130, 246);
                    colorSecondary = p.color(16, 185, 129);
                    colorTertiary = p.color(244, 63, 94);
                    speed = 2.0;
                } else if (currentModule === 'landslide') {
                    colorPrimary = p.color(20, 184, 166);
                    colorSecondary = p.color(16, 185, 129);
                    colorTertiary = p.color(56, 189, 248);
                    speed = 0.8;
                } else if (currentModule === 'potree') {
                    colorPrimary = p.color(168, 85, 247);
                    colorSecondary = p.color(59, 130, 246);
                    colorTertiary = p.color(255, 255, 255);
                    speed = 2.5;
                } else if (currentModule === 'orbit') {
                    colorPrimary = p.color(59, 130, 246);
                    colorSecondary = p.color(168, 85, 247);
                    colorTertiary = p.color(16, 185, 129);
                    speed = 1.2;
                } else {
                    colorPrimary = p.color(168, 85, 247);
                    colorSecondary = p.color(244, 63, 94);
                    colorTertiary = p.color(251, 191, 36);
                    speed = 1.5;
                }
            }

            p.windowResized = () => {
                p.resizeCanvas(p5Container.clientWidth, 140);
            };
        };

        p5Instance = new p5(sketch);
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
        if (p5Instance) p5Instance.remove();
    });
</script>

<div bind:this={p5Container} class="w-full h-full relative"></div>