

var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var websites = [];

if (localStorage.getItem('ProductContainer') == null) {
    websites = [];
} else {
    websites = JSON.parse(localStorage.getItem('ProductContainer'));
    DisplayWebsite();
}

function addWebsite() {
    var normalizedUrl = normalizeUrl(siteURL.value);

    var website = {
        Name: siteName.value.trim(),
        url: normalizedUrl
    };

    if (!validateInputs(website.Name, website.url)) {
        return;
    }

    websites.push(website);
    ClearInputs();
    DisplayWebsite();

    localStorage.setItem('ProductContainer', JSON.stringify(websites));
}

function DisplayWebsite() {
    var tableContent = "";

    for (var i = 0; i < websites.length; i++) {
        tableContent += `
            <tr>
                <td>${i + 1}</td>
                <td>${websites[i].Name}</td>
                <td>
                    <button type="button" class="btn btn-success" 
                        onclick="window.open('${websites[i].url}', '_blank')">
                        <i class="fa-solid fa-eye"></i> Visit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" 
                        onclick="DeleteWebsite(${i})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;
    }

    document.getElementById('tableBody').innerHTML = tableContent;
}

function ClearInputs() {
    siteName.value = null;
    siteURL.value = null;
    closeAlert();
}

function DeleteWebsite(index) {
    websites.splice(index, 1);
    DisplayWebsite();
    localStorage.setItem('ProductContainer', JSON.stringify(websites));
}

function showAlert() {
    var alertEl = document.getElementById('validationAlert');
    alertEl.classList.remove('d-none');
    alertEl.classList.add('d-block'); 
}

function closeAlert() {
    var alertEl = document.getElementById('validationAlert');
    alertEl.classList.remove('d-block');
    alertEl.classList.add('d-none');
}

function normalizeUrl(url) {
    if (!url) return '';
    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url;
}

function validateInputs(name, url) {
    const nameRegex = /^[A-Za-z0-9 ]{3,}$/;
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\S*)?$/i;

    name = (name || '').trim();
    url = (url || '').trim();

    if (!nameRegex.test(name) || !urlRegex.test(url)) {
        showAlert();
        return false;
    }

    closeAlert();
    return true;
}

