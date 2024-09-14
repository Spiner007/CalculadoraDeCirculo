let taskbarVisible = false;

function convertToBase(value, unit, isArea) {
    const conversionRates = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.34,
        nmi: 1852,
        'm²': 1,
        'cm²': 0.0001,
        'mm²': 1e-6,
        'km²': 1e6,
        'in²': 0.00064516,
        'ft²': 0.092903,
        'yd²': 0.836127,
        'mi²': 2.58999e6,
        'nmi²': 3.428e6
    };
    return value * conversionRates[unit];
}

function convertFromBase(value, unit, isArea) {
    const conversionRates = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.34,
        nmi: 1852,
        'm²': 1,
        'cm²': 0.0001,
        'mm²': 1e-6,
        'km²': 1e6,
        'in²': 0.00064516,
        'ft²': 0.092903,
        'yd²': 0.836127,
        'mi²': 2.58999e6,
        'nmi²': 3.428e6
    };
    return value / conversionRates[unit];
}

function roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
}

function updateResults() {
    const radioValue = parseFloat(document.getElementById('radio-value').value) || 0;
    const radioUnit = document.getElementById('radio-unit').value;

    const diameterValue = parseFloat(document.getElementById('diameter-value').value) || 0;
    const diameterUnit = document.getElementById('diameter-unit').value;

    const circumferenceValue = parseFloat(document.getElementById('circumference-value').value) || 0;
    const circumferenceUnit = document.getElementById('circumference-unit').value;

    const areaValue = parseFloat(document.getElementById('area-value').value) || 0;
    const areaUnit = document.getElementById('area-unit').value;

    let radiusInMeters = 0;
    let valuesEntered = 0;

    if (!isNaN(radioValue) && radioValue > 0) {
        radiusInMeters = convertToBase(radioValue, radioUnit, false);
        valuesEntered++;
    }

    if (!isNaN(diameterValue) && diameterValue > 0) {
        radiusInMeters = convertToBase(diameterValue / 2, diameterUnit, false);
        valuesEntered++;
    }

    if (!isNaN(circumferenceValue) && circumferenceValue > 0) {
        radiusInMeters = convertToBase(circumferenceValue / (2 * Math.PI), circumferenceUnit, false);
        valuesEntered++;
    }

    if (!isNaN(areaValue) && areaValue > 0) {
        radiusInMeters = Math.sqrt(convertToBase(areaValue, areaUnit, true) / Math.PI);
        valuesEntered++;
    }

    if (valuesEntered > 1) {
        alert('Por favor, ingrese solo un valor para calcular.');
        resetForm();
        return;
    }

    const diameterInMeters = 2 * radiusInMeters;
    const circumferenceInMeters = 2 * Math.PI * radiusInMeters;
    const areaInMeters = Math.PI * radiusInMeters * radiusInMeters;

    const diameterResult = convertFromBase(diameterInMeters, diameterUnit, false);
    const circumferenceResult = convertFromBase(circumferenceInMeters, circumferenceUnit, false);
    const areaResult = convertFromBase(areaInMeters, areaUnit, true);

    document.getElementById('radius-result').textContent = `Radio: ${roundToTwoDecimals(convertFromBase(radiusInMeters, radioUnit, false))} ${radioUnit}`;
    document.getElementById('diameter-result').textContent = `Diámetro: ${roundToTwoDecimals(diameterResult)} ${diameterUnit}`;
    document.getElementById('circumference-result').textContent = `Circunferencia: ${roundToTwoDecimals(circumferenceResult)} ${circumferenceUnit}`;
    document.getElementById('area-result').textContent = `Área: ${roundToTwoDecimals(areaResult)} ${areaUnit}`;

    document.getElementById('results').classList.add('show');
}

function resetForm() {
    document.getElementById('radio-value').value = '';
    document.getElementById('diameter-value').value = '';
    document.getElementById('circumference-value').value = '';
    document.getElementById('area-value').value = '';

    document.getElementById('radio-unit').value = 'm';
    document.getElementById('diameter-unit').value = 'm';
    document.getElementById('circumference-unit').value = 'm';
    document.getElementById('area-unit').value = 'm²';

    document.getElementById('radius-result').textContent = 'Radio: ';
    document.getElementById('diameter-result').textContent = 'Diámetro: ';
    document.getElementById('circumference-result').textContent = 'Circunferencia: ';
    document.getElementById('area-result').textContent = 'Área: ';

    document.getElementById('results').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.unit-select').forEach(select => {
        select.addEventListener('change', updateResults);
    });

    document.querySelector('button[type="button"]').addEventListener('click', updateResults);

    document.querySelector('button[type="reset"]').addEventListener('click', function(event) {
        event.preventDefault(); 
        resetForm();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            updateResults();
        }
    });

    const hamburger = document.getElementById('hamburger');
    const closeTaskbar = document.getElementById('closeTaskbar');
    const taskbar = document.getElementById('taskbar');
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    let taskbarVisible = false;


hamburger.addEventListener('click', function() {
    if (taskbarVisible) {
        taskbar.style.transform = 'translateX(-100%)'; 
        setTimeout(() => {
            taskbar.style.display = 'none'; 
            taskbar.inert = true; 
        }, 300); 
    } else {
        taskbar.style.display = 'flex'; 
        setTimeout(() => {
            taskbar.style.transform = 'translateX(0)';
            taskbar.inert = false; 
        }, 10);
    }
    taskbarVisible = !taskbarVisible; 
});





    if (closeTaskbar) {
        closeTaskbar.addEventListener('click', function() {
            taskbar.style.transform = 'translateX(-100%)'; 
            setTimeout(() => {
                taskbar.style.display = 'none'; 
                hamburger.focus(); 
            }, 300); 
        });
    }

    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('darkMode', this.checked);
        });
    }

    var modal = document.getElementById("eulaModal");
    var acceptBtn = document.getElementById("acceptEula");
    var declineBtn = document.getElementById("declineEula");

    if (modal && !localStorage.getItem("eulaAccepted")) {
        modal.style.display = "block";
        acceptBtn.focus(); 
    }

    if (acceptBtn) {
        acceptBtn.onclick = function() {
            localStorage.setItem("eulaAccepted", "true");
            modal.style.display = "none";
            document.querySelector('h1').focus(); 
        };
    }

    if (declineBtn) {
        declineBtn.onclick = function() {
            window.location.href = "pagina_error.html";
        };
    }

    
    applyDarkMode();
    handleDarkModeSwitch();
});

function applyDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    const body = document.body;
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    if (darkModeEnabled) {
        body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeSwitch.checked = false;
    }
}

function handleDarkModeSwitch() {
    const darkModeSwitch = document.getElementById('darkModeSwitch');

    darkModeSwitch.addEventListener('change', function () {
        const body = document.body;
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false'); 
        }
    });
}

// localStorage.removeItem("eulaAccepted"); // Comando para restablecer los términos y condiciones
