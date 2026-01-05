let colorPicker;
let currentColorBtn = 'color1';
let colors = {
    color1: '#3b82f6',
    color2: '#8b5cf6'
};

let state = {
    shape: 'blob',
    gradientType: 'linear',
    angle: 90,
    tl: 30,
    tr: 70,
    br: 70,
    bl: 30,
    smooth: 50,
    waveHeight: 20,
    waveCount: 2,
    waveSmooth: 50,
    bumpSize: 30,
    bumpCount: 3,
    softEdges: 60
};

document.addEventListener('DOMContentLoaded', () => {
    initColorPicker();
    updatePreview();
    setupEventListeners();
});

function initColorPicker() {
    colorPicker = new iro.ColorPicker('#colorPicker', {
        width: 240,
        color: colors.color1,
        borderWidth: 1,
        borderColor: '#3d3f42',
        layout: [
            {
                component: iro.ui.Wheel,
                options: {
                    wheelLightness: false,
                    wheelAngle: 0,
                    wheelDirection: 'clockwise'
                }
            }
        ],
        handleRadius: 8,
        handleOrigin: { x: 0, y: 0 },
        padding: 4,
        margin: 4,
        sliderMargin: 0,
        borderWidth: 1,
        antialias: true
    });

    colorPicker.on('color:change', (color) => {
        colors[currentColorBtn] = color.hexString;
        document.getElementById(currentColorBtn + '-btn').style.background = color.hexString;
        updatePreview();
    });
}

function setupEventListeners() {
    document.querySelectorAll('[data-shape]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.shape = btn.dataset.shape;
            document.querySelectorAll('[data-shape]').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            document.getElementById('blob-controls').classList.add('hidden');
            document.getElementById('wave-controls').classList.add('hidden');
            document.getElementById('cloud-controls').classList.add('hidden');
            
            if (state.shape === 'blob') {
                document.getElementById('blob-controls').classList.remove('hidden');
            } else if (state.shape === 'wave') {
                document.getElementById('wave-controls').classList.remove('hidden');
            } else if (state.shape === 'cloud') {
                document.getElementById('cloud-controls').classList.remove('hidden');
            }
            
            updatePreview();
        });
    });

    document.getElementById('color1-btn').addEventListener('click', () => {
        currentColorBtn = 'color1';
        colorPicker.color.hexString = colors.color1;
    });

    document.getElementById('color2-btn').addEventListener('click', () => {
        currentColorBtn = 'color2';
        colorPicker.color.hexString = colors.color2;
    });

    document.getElementById('gradientType').addEventListener('change', (e) => {
        state.gradientType = e.target.value;
        updatePreview();
    });

    document.getElementById('angle').addEventListener('input', (e) => {
        state.angle = e.target.value;
        document.getElementById('angleValue').textContent = state.angle;
        updatePreview();
    });

    document.getElementById('tl').addEventListener('input', (e) => {
        state.tl = e.target.value;
        document.getElementById('tlValue').textContent = state.tl;
        updatePreview();
    });

    document.getElementById('tr').addEventListener('input', (e) => {
        state.tr = e.target.value;
        document.getElementById('trValue').textContent = state.tr;
        updatePreview();
    });

    document.getElementById('br').addEventListener('input', (e) => {
        state.br = e.target.value;
        document.getElementById('brValue').textContent = state.br;
        updatePreview();
    });

    document.getElementById('bl').addEventListener('input', (e) => {
        state.bl = e.target.value;
        document.getElementById('blValue').textContent = state.bl;
        updatePreview();
    });

    document.getElementById('smooth').addEventListener('input', (e) => {
        state.smooth = e.target.value;
        document.getElementById('smoothValue').textContent = state.smooth;
        updatePreview();
    });

    document.getElementById('waveHeight').addEventListener('input', (e) => {
        state.waveHeight = e.target.value;
        document.getElementById('waveHeightValue').textContent = state.waveHeight;
        updatePreview();
    });

    document.getElementById('waveCount').addEventListener('input', (e) => {
        state.waveCount = e.target.value;
        document.getElementById('waveCountValue').textContent = state.waveCount;
        updatePreview();
    });

    document.getElementById('waveSmooth').addEventListener('input', (e) => {
        state.waveSmooth = e.target.value;
        document.getElementById('waveSmoothValue').textContent = state.waveSmooth;
        updatePreview();
    });

    document.getElementById('bumpSize').addEventListener('input', (e) => {
        state.bumpSize = e.target.value;
        document.getElementById('bumpSizeValue').textContent = state.bumpSize;
        updatePreview();
    });

    document.getElementById('bumpCount').addEventListener('input', (e) => {
        state.bumpCount = e.target.value;
        document.getElementById('bumpCountValue').textContent = state.bumpCount;
        updatePreview();
    });

    document.getElementById('softEdges').addEventListener('input', (e) => {
        state.softEdges = e.target.value;
        document.getElementById('softEdgesValue').textContent = state.softEdges;
        updatePreview();
    });

    document.getElementById('copyBtn').addEventListener('click', () => {
        const css = document.getElementById('cssOutput').textContent;
        navigator.clipboard.writeText(css).then(() => {
            const btn = document.getElementById('copyBtn');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerHTML = original;
                btn.classList.remove('copied');
            }, 2000);
        });
    });

    document.getElementById('resetPreview').addEventListener('click', () => {
        colors = {
            color1: '#3b82f6',
            color2: '#8b5cf6'
        };
        
        state = {
            shape: 'blob',
            gradientType: 'linear',
            angle: 90,
            tl: 30,
            tr: 70,
            br: 70,
            bl: 30,
            smooth: 50,
            waveHeight: 20,
            waveCount: 2,
            waveSmooth: 50,
            bumpSize: 30,
            bumpCount: 3,
            softEdges: 60
        };
        
        document.getElementById('color1-btn').style.background = colors.color1;
        document.getElementById('color2-btn').style.background = colors.color2;
        document.getElementById('gradientType').value = state.gradientType;
        document.getElementById('angle').value = state.angle;
        document.getElementById('tl').value = state.tl;
        document.getElementById('tr').value = state.tr;
        document.getElementById('br').value = state.br;
        document.getElementById('bl').value = state.bl;
        document.getElementById('smooth').value = state.smooth;
        document.getElementById('waveHeight').value = state.waveHeight;
        document.getElementById('waveCount').value = state.waveCount;
        document.getElementById('waveSmooth').value = state.waveSmooth;
        document.getElementById('bumpSize').value = state.bumpSize;
        document.getElementById('bumpCount').value = state.bumpCount;
        document.getElementById('softEdges').value = state.softEdges;
        
        document.getElementById('angleValue').textContent = state.angle;
        document.getElementById('tlValue').textContent = state.tl;
        document.getElementById('trValue').textContent = state.tr;
        document.getElementById('brValue').textContent = state.br;
        document.getElementById('blValue').textContent = state.bl;
        document.getElementById('smoothValue').textContent = state.smooth;
        document.getElementById('waveHeightValue').textContent = state.waveHeight;
        document.getElementById('waveCountValue').textContent = state.waveCount;
        document.getElementById('waveSmoothValue').textContent = state.waveSmooth;
        document.getElementById('bumpSizeValue').textContent = state.bumpSize;
        document.getElementById('bumpCountValue').textContent = state.bumpCount;
        document.getElementById('softEdgesValue').textContent = state.softEdges;
        
        document.querySelectorAll('[data-shape]').forEach(b => {
            b.classList.remove('active');
        });
        document.querySelector('[data-shape="blob"]').classList.add('active');
        
        document.getElementById('blob-controls').classList.remove('hidden');
        document.getElementById('wave-controls').classList.add('hidden');
        document.getElementById('cloud-controls').classList.add('hidden');
        
        colorPicker.color.hexString = colors.color1;
        updatePreview();
    });

    document.querySelectorAll('[data-example]').forEach(btn => {
        btn.addEventListener('click', () => {
            const example = btn.dataset.example;
            if (example === 'droplet') {
                state.shape = 'wave';
                colors.color1 = '#60a5fa';
                colors.color2 = '#06b6d4';
                updateExample();
            } else if (example === 'heart') {
                state.shape = 'cloud';
                colors.color1 = '#ec4899';
                colors.color2 = '#ef4444';
                updateExample();
            } else if (example === 'organic') {
                state.shape = 'blob';
                colors.color1 = '#34d399';
                colors.color2 = '#0d9488';
                updateExample();
            }
        });
    });
}

function updateExample() {
    document.getElementById('color1-btn').style.background = colors.color1;
    document.getElementById('color2-btn').style.background = colors.color2;
    
    document.querySelectorAll('[data-shape]').forEach(b => {
        b.classList.remove('active');
    });
    document.querySelector(`[data-shape="${state.shape}"]`).classList.add('active');
    
    document.getElementById('blob-controls').classList.add('hidden');
    document.getElementById('wave-controls').classList.add('hidden');
    document.getElementById('cloud-controls').classList.add('hidden');
    
    if (state.shape === 'blob') {
        document.getElementById('blob-controls').classList.remove('hidden');
    } else if (state.shape === 'wave') {
        document.getElementById('wave-controls').classList.remove('hidden');
    } else if (state.shape === 'cloud') {
        document.getElementById('cloud-controls').classList.remove('hidden');
    }
    
    updatePreview();
}

function updatePreview() {
    const preview = document.getElementById('preview');
    
    let gradient = '';
    if (state.gradientType === 'linear') {
        gradient = `linear-gradient(${state.angle}deg, ${colors.color1}, ${colors.color2})`;
    } else {
        gradient = `radial-gradient(circle, ${colors.color1}, ${colors.color2})`;
    }
    
    preview.style.background = gradient;
    
    let borderRadius = '';
    if (state.shape === 'blob') {
        const tl = state.tl;
        const tr = state.tr;
        const br = state.br;
        const bl = state.bl;
        const smooth = state.smooth;
        
        borderRadius = `${tl}% ${tr}% ${br}% ${bl}%`;
        
        const verticalTl = smooth;
        const verticalTr = 100 - smooth;
        const verticalBr = smooth;
        const verticalBl = 100 - smooth;
        
        borderRadius += ` / ${verticalTl}% ${verticalTr}% ${verticalBr}% ${verticalBl}%`;
        
    } else if (state.shape === 'wave') {
        const waveHeight = state.waveHeight;
        const smooth = state.waveSmooth;
        borderRadius = `${50 - waveHeight}% ${50 + waveHeight}% ${50 + waveHeight}% ${50 - waveHeight}% / ${smooth}% ${smooth}% ${100 - smooth}% ${100 - smooth}%`;
    } else if (state.shape === 'cloud') {
        const bump = state.bumpSize;
        const soft = state.softEdges;
        borderRadius = `${bump}% ${bump}% ${bump}% ${bump}% / ${soft}% ${soft}% ${100 - soft}% ${100 - soft}%`;
    }
    
    preview.style.borderRadius = borderRadius;
    updateCSSOutput(gradient, borderRadius);
}

function updateCSSOutput(gradient, borderRadius) {
    let css = `.shape {\n`;
    css += `    width: 300px;\n`;
    css += `    height: 300px;\n`;
    css += `    background: ${gradient};\n`;
    css += `    border-radius: ${borderRadius};\n`;
    css += `}`;
    
    document.getElementById('cssOutput').textContent = css;
}
