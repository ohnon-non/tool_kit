
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

// Processing when the page is loaded
// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
    // Word list
    // 単語リスト
    let words = [];

    // Get DOM elements
    // DOM要素を取得
    const languageCheckboxesContainer = document.getElementById("language-checkboxes");
    const selectAllButton = document.getElementById("select-all-button");
    const deselectAllButton = document.getElementById("deselect-all-button");
    const outputButton = document.getElementById("output-button");
    const randomWordOutput = document.getElementById("random-word-output");

    // Function to load CSV file when the page is loaded
    // ページ読み込み時にCSVファイルを読み込む関数
    async function loadCSV() {
        try {
            // Fetch the CSV file
            // CSVファイルをフェッチ
            const response = await fetch('../data/words_multilanguage.csv');
            const data = await response.text();

            // Parse the CSV data using PapaParse
            // PapaParseを使用してCSVデータをパース
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function (results) {
                    // Get the header row
                    // ヘッダー行を取得
                    const header = results.meta.fields;
                    const selectedLanguages = [];

                    // Dynamically generate language selection checkboxes
                    // 言語選択のチェックボックスを動的に生成
                    header.forEach((language, index) => {
                        if (index > 1) {
                            const languageDiv = document.createElement('div');
                            languageDiv.className = 'language-div';
                            languageCheckboxesContainer.appendChild(languageDiv);

                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.id = language;
                            checkbox.value = language;
                            checkbox.checked = true;
                            languageDiv.appendChild(checkbox);

                            const label = document.createElement('label');
                            label.htmlFor = language;
                            label.appendChild(document.createTextNode(language));
                            languageDiv.appendChild(label);

                            selectedLanguages.push(language);
                        }
                    });


                    // Generate the word list
                    // 単語リストを生成
                    words = results.data.map(row => {
                        const word = {};
                        header.forEach(language => {
                            word[language] = row[language];
                        });
                        return word;
                    });

                    // Click event listener for the Select All button
                    // Select Allボタンのクリックイベントリスナー
                    selectAllButton.addEventListener('click', function () {
                        selectedLanguages.forEach(language => document.getElementById(language).checked = true);
                    });

                    // Click event listener for the Deselect All button
                    // Deselect Allボタンのクリックイベントリスナー
                    deselectAllButton.addEventListener('click', function () {
                        selectedLanguages.forEach(language => document.getElementById(language).checked = false);
                    });

                    // Click event listener for the output word button
                    // 単語を出力ボタンのクリックイベントリスナー
                    outputButton.addEventListener('click', function () {
                        // Get the selected languages
                        // 選択された言語を取得
                        const selectedLanguage = selectedLanguages.filter(language => document.getElementById(language).checked);
                        if (selectedLanguage.length === 0) {
                            alert('少なくとも1つの言語を選択してください。');
                            return;
                        }

                        // Display a random word in the selected languages
                        // 選択された言語のランダムな単語を表示
                        const randomWord = words[Math.floor(Math.random() * words.length)];
                        randomWordOutput.innerHTML = selectedLanguage.map(language => `<p>${language}: ${randomWord[language] ? randomWord[language] : ''} <button onclick="navigator.clipboard.writeText('${randomWord[language] ? randomWord[language] : ''}'); showToast('コピーしました');">copy</button></p>`).join('');
                    });
                },
                error: function (error) {
                    // Display error message to the user
                    // ユーザーにエラーメッセージを表示
                    alert('CSVファイルの読み込みエラー: ' + error.message);
                }
            });
        } catch (error) {
            // Display error message to the user
            // ユーザーにエラーメッセージを表示
            alert('CSVファイルの読み込みエラー: ' + error.message);
        }
    }

    // Load the CSV file
    // CSVファイルを読み込む
    loadCSV();
});
