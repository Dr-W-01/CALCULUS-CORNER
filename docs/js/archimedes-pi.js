/**
 * Archimedes' Pi Approximation — inscribed/circumscribed polygon visualizer.
 * Core logic adapted from the original standalone page; themed for Calculus Corner.
 */
(function (global) {
    'use strict';

    const SIZE = 340;
    const CX = 170;
    const CY = 162;
    const R_PX = 125;
    const MIN_SIDES = 6;
    const MAX_SIDES = 12288;

    const COLORS = {
        inscribed: '#5b9a7a',
        inscribedFill: 'rgba(91, 154, 122, 0.12)',
        circumscribed: '#d4a853',
        circumscribedFill: 'rgba(212, 168, 83, 0.12)',
        circleFill: '#1a1010',
        circleStroke: '#d4d4d8',
        diameter: '#d4d4d8',
        canvasBg: '#1a1010',
    };

    function drawPolygons(ctx, n) {
        ctx.save();
        ctx.fillStyle = COLORS.circumscribedFill;
        ctx.strokeStyle = COLORS.circumscribed;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        const rOuter = R_PX / Math.cos(Math.PI / n);
        const offsetOuter = -Math.PI / 2 + Math.PI / n;
        for (let i = 0; i < n; i++) {
            const ang = offsetOuter + (2 * Math.PI * i) / n;
            const x = CX + rOuter * Math.cos(ang);
            const y = CY + rOuter * Math.sin(ang);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = COLORS.circleFill;
        ctx.strokeStyle = COLORS.circleStroke;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(CX, CY, R_PX, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = COLORS.diameter;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(CX - R_PX + 8, CY + R_PX + 19);
        ctx.lineTo(CX + R_PX - 8, CY + R_PX + 19);
        ctx.stroke();
        ctx.fillStyle = COLORS.diameter;
        ctx.font = '500 12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('diameter = 1', CX, CY + R_PX + 35);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = COLORS.inscribedFill;
        ctx.strokeStyle = COLORS.inscribed;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const ang = -Math.PI / 2 + (2 * Math.PI * i) / n;
            const x = CX + R_PX * Math.cos(ang);
            const y = CY + R_PX * Math.sin(ang);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    function drawFrame(ctx, n, view) {
        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.fillStyle = COLORS.canvasBg;
        ctx.fillRect(0, 0, SIZE, SIZE);

        const scale = view ? view.scale : 1;
        const panX = view ? view.panX : 0;
        const panY = view ? view.panY : 0;

        ctx.save();
        ctx.translate(SIZE / 2 + panX, SIZE / 2 + panY);
        ctx.scale(scale, scale);
        ctx.translate(-SIZE / 2, -SIZE / 2);
        drawPolygons(ctx, n);
        ctx.restore();
    }

    function drawPreview(canvas, n) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        drawFrame(ctx, n == null ? 12 : n);
    }

    function initDetailPage() {
        const canvas = document.getElementById('archimedes-pi-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let n = MIN_SIDES;
        const view = { scale: 1, panX: 0, panY: 0 };

        const nDisplay = document.getElementById('archimedes-n-display');
        const lowerDisplay = document.getElementById('archimedes-lower-display');
        const upperDisplay = document.getElementById('archimedes-upper-display');
        const milestone = document.getElementById('archimedes-milestone');
        const halveBtn = document.getElementById('archimedes-halve-btn');

        function updateDisplay() {
            const lower = (n * Math.sin(Math.PI / n)).toFixed(8);
            const upper = (n * Math.tan(Math.PI / n)).toFixed(8);
            if (nDisplay) nDisplay.textContent = String(n);
            if (lowerDisplay) lowerDisplay.textContent = lower;
            if (upperDisplay) upperDisplay.textContent = upper;
            if (milestone) milestone.hidden = n < 96;
            if (halveBtn) halveBtn.disabled = n === MIN_SIDES;
        }

        function redraw() {
            drawFrame(ctx, n, view);
            updateDisplay();
        }

        function doubleSides() {
            if (n >= MAX_SIDES) return;
            n *= 2;
            redraw();
        }

        function halveSides() {
            if (n <= MIN_SIDES) return;
            n /= 2;
            redraw();
        }

        function resetToHexagon() {
            n = MIN_SIDES;
            view.scale = 1;
            view.panX = 0;
            view.panY = 0;
            redraw();
        }

        document.getElementById('archimedes-double')?.addEventListener('click', doubleSides);
        document.getElementById('archimedes-halve-btn')?.addEventListener('click', halveSides);
        document.getElementById('archimedes-reset')?.addEventListener('click', resetToHexagon);

        document.addEventListener('keydown', function (e) {
            if (e.key.toLowerCase() === 'd') doubleSides();
            if (e.key.toLowerCase() === 'h') halveSides();
        });

        let dragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let panStartX = 0;
        let panStartY = 0;

        canvas.addEventListener('mousedown', function (e) {
            dragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            panStartX = view.panX;
            panStartY = view.panY;
            canvas.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', function () {
            dragging = false;
            canvas.style.cursor = 'grab';
        });

        window.addEventListener('mousemove', function (e) {
            if (!dragging) return;
            view.panX = panStartX + (e.clientX - dragStartX);
            view.panY = panStartY + (e.clientY - dragStartY);
            redraw();
        });

        canvas.addEventListener('wheel', function (e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * SIZE;
            const my = ((e.clientY - rect.top) / rect.height) * SIZE;
            const factor = e.deltaY < 0 ? 1.1 : 0.9;
            const nextScale = Math.min(4, Math.max(0.5, view.scale * factor));
            const ratio = nextScale / view.scale;
            view.panX = mx - (mx - view.panX - SIZE / 2) * ratio - SIZE / 2;
            view.panY = my - (my - view.panY - SIZE / 2) * ratio - SIZE / 2;
            view.scale = nextScale;
            redraw();
        }, { passive: false });

        canvas.style.cursor = 'grab';
        redraw();
    }

    global.ArchimedesPi = {
        drawPreview,
        drawFrame,
        initDetailPage,
    };

    if (document.getElementById('archimedes-pi-canvas')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initDetailPage);
        } else {
            initDetailPage();
        }
    }
})(window);