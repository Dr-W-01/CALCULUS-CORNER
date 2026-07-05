/**
 * Fake Proof: π = 4 — staircase-around-circle visualizer.
 * Core drawing and interaction logic adapted from the original standalone page.
 */
(function (global) {
    'use strict';

    const SIZE = 340;
    const CX = 170;
    const CY = 170;
    const R = 125;
    const MAX_LEVEL = 9;

    const COLORS = {
        circle: '#5b9a7a',
        staircase: '#d4a853',
        diameter: '#d4d4d8',
        canvasBg: '#1a1010',
    };

    function drawStaircase(ctx, level) {
        const m = 1 << level;
        const steps = 4 * m;
        const delta = (2 * Math.PI) / steps;

        ctx.save();
        ctx.strokeStyle = COLORS.staircase;
        ctx.lineWidth = 3.2;
        ctx.lineJoin = 'round';
        ctx.beginPath();

        for (let i = 0; i < steps; i++) {
            const theta1 = i * delta - Math.PI / 2;
            const theta2 = (i + 1) * delta - Math.PI / 2;

            const x1 = CX + R * Math.cos(theta1);
            const y1 = CY + R * Math.sin(theta1);
            const x2 = CX + R * Math.cos(theta2);
            const y2 = CY + R * Math.sin(theta2);

            if (i === 0) ctx.moveTo(x1, y1);

            const int1 = { x: x1, y: y2 };
            const int2 = { x: x2, y: y1 };
            const d1 = Math.hypot(int1.x - CX, int1.y - CY);
            const d2 = Math.hypot(int2.x - CX, int2.y - CY);
            const inter = d1 > d2 ? int1 : int2;

            ctx.lineTo(inter.x, inter.y);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();
        ctx.restore();
    }

    function drawFrame(ctx, level) {
        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.fillStyle = COLORS.canvasBg;
        ctx.fillRect(0, 0, SIZE, SIZE);

        ctx.save();
        ctx.strokeStyle = COLORS.circle;
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.arc(CX, CY, R, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = COLORS.diameter;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(CX - R + 8, CY + R + 19);
        ctx.lineTo(CX + R - 8, CY + R + 19);
        ctx.stroke();
        ctx.fillStyle = COLORS.diameter;
        ctx.font = '500 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('diameter = 1', CX, CY + R + 35);
        ctx.restore();

        drawStaircase(ctx, level);
    }

    function drawPreview(canvas, level) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        drawFrame(ctx, level == null ? 4 : level);
    }

    function initDetailPage() {
        const canvas = document.getElementById('fake-pi-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let level = 0;

        const stairDisplay = document.getElementById('stair-display');
        const circleDisplay = document.getElementById('circle-display');
        const levelDisplay = document.getElementById('level-display');
        const milestone = document.getElementById('milestone');
        const decreaseBtn = document.getElementById('decrease-btn');

        function updateDisplay() {
            if (stairDisplay) stairDisplay.textContent = '4.00000000';
            if (circleDisplay) circleDisplay.textContent = Math.PI.toFixed(8);
            if (levelDisplay) levelDisplay.textContent = String(level);
            if (milestone) milestone.hidden = level < 5;
            if (decreaseBtn) decreaseBtn.disabled = level === 0;
        }

        function redraw() {
            drawFrame(ctx, level);
            updateDisplay();
        }

        function increaseLevel() {
            if (level >= MAX_LEVEL) return;
            level++;
            redraw();
        }

        function decreaseLevel() {
            if (level <= 0) return;
            level--;
            redraw();
        }

        function resetToSquare() {
            level = 0;
            redraw();
        }

        document.getElementById('fake-pi-increase')?.addEventListener('click', increaseLevel);
        document.getElementById('decrease-btn')?.addEventListener('click', decreaseLevel);
        document.getElementById('fake-pi-reset')?.addEventListener('click', resetToSquare);

        document.addEventListener('keydown', function (e) {
            if (e.key.toLowerCase() === 'd') increaseLevel();
            if (e.key.toLowerCase() === 'f') decreaseLevel();
        });

        redraw();
    }

    global.FakePiProof = {
        drawPreview,
        drawFrame,
        initDetailPage,
    };

    if (document.getElementById('fake-pi-canvas')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initDetailPage);
        } else {
            initDetailPage();
        }
    }
})(window);