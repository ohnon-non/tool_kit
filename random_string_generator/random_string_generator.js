// HTML要素を取得
const generateButton = document.getElementById("generate-button");
const randomStringElement = document.getElementById("random-string");
const charCountInput = document.getElementById("charCount");
const includeUppercaseCheckbox = document.getElementById("includeUppercase");
const includeLowercaseCheckbox = document.getElementById("includeLowercase");
const includeNumbersCheckbox = document.getElementById("includeNumbers");
const includeSymbolsCheckbox = document.getElementById("includeSymbols");

// ボタンがクリックされたときの処理を追加
generateButton.addEventListener("click", function() {
    const charCount = parseInt(charCountInput.value, 10);

    if (!isNaN(charCount) && charCount >= 1 && charCount <= 100) {
        const randomString = generateRandomString(charCount);
        randomStringElement.textContent = randomString;
    } else {
        randomStringElement.textContent = "無効な文字数です。1から100の範囲で指定してください。";
    }
});

// ランダムな文字列を生成する関数
function generateRandomString(length) {
    let characters = "";

    if (includeUppercaseCheckbox.checked) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeLowercaseCheckbox.checked) {
        characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (includeNumbersCheckbox.checked) {
        characters += "0123456789";
    }

    if (includeSymbolsCheckbox.checked) {
        characters += "!@#$%^&*()_+-=[]{}|;:',.<>?";
    }

    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

// HTML elements for the new buttons
const selectAllButton = document.getElementById("select-all-button");
const deselectAllButton = document.getElementById("deselect-all-button");
const copyButton = document.getElementById("copy-button");

// Add event listener for the select all button
selectAllButton.addEventListener("click", function() {
    includeUppercaseCheckbox.checked = true;
    includeLowercaseCheckbox.checked = true;
    includeNumbersCheckbox.checked = true;
    includeSymbolsCheckbox.checked = true;
});

// Add event listener for the deselect all button
deselectAllButton.addEventListener("click", function() {
    includeUppercaseCheckbox.checked = false;
    includeLowercaseCheckbox.checked = false;
    includeNumbersCheckbox.checked = false;
    includeSymbolsCheckbox.checked = false;
});

// Function to show toast notification
// Toast通知を表示する関数
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () {
        document.body.removeChild(toast);
    }, 2000);
}

// Add event listener for the copy button
copyButton.addEventListener("click", function() {
    const textToCopy = randomStringElement.textContent;
    navigator.clipboard.writeText(textToCopy).then(function() {
        showToast('コピーしました');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});
