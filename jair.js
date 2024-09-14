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
        document.getElementById('radio-value').value = '';
        document.getElementById('diameter-value').value = '';
        document.getElementById('circumference-value').value = '';
        document.getElementById('area-value').value = '';
        document.getElementById('results').classList.remove('show');
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

document.querySelectorAll('.unit-select').forEach(select => {
    select.addEventListener('change', updateResults);
});

document.querySelector('button[type="button"]').addEventListener('click', updateResults);

document.querySelector('button[type="reset"]').addEventListener('click', function(event) {
    event.preventDefault(); 
    resetForm();
});

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

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        updateResults();
    }
});

function toggleDarkMode() {
    var body = document.body;
    var isDarkMode = body.classList.toggle("dark-mode");
    document.getElementById("darkModeSwitch").checked = isDarkMode;
}

window.onload = function() {
    var modal = document.getElementById("eulaModal");
    var acceptBtn = document.getElementById("acceptEula");
    var declineBtn = document.getElementById("declineEula");

    if (!localStorage.getItem("eulaAccepted")) {
        modal.style.display = "block";
    }

    acceptBtn.onclick = function() {
        localStorage.setItem("eulaAccepted", "true");
        modal.style.display = "none";
    };

    declineBtn.onclick = function() {
        window.location.href = "pagina_error.html";
    };
};

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}



let taskbarVisible = false;

document.getElementById('hamburger').addEventListener('click', function() {
    const taskbar = document.getElementById('taskbar');
    if (taskbarVisible) {
        taskbar.style.transform = 'translateX(-100%)'; 
        setTimeout(() => {
            taskbar.style.display = 'none'; 
        }, 300); 
    } else {
        taskbar.style.display = 'flex'; 
        setTimeout(() => {
            taskbar.style.transform = 'translateX(0)'; 
        }, 10); 
    }
    taskbarVisible = !taskbarVisible; 
});

document.getElementById('closeTaskbar').addEventListener('click', function() {
    const taskbar = document.getElementById('taskbar');
    taskbar.style.transform = 'translateX(-100%)'; 
    setTimeout(() => {
        taskbar.style.display = 'none'; 
    }, 300); 
});

document.getElementById('darkModeSwitch').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
});








//localStorage.removeItem("eulaAccepted"); "en el navegador restura los terminos y condiciones" 
