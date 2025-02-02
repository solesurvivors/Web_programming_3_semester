document.getElementById('swapContentBtn').addEventListener('click', () => {
    const block1Link = document.querySelector('.block1 h1 a');
    const block6Link = document.querySelector('.block6 h1 a');
    if (block1Link && block6Link) {
        const tempText = block1Link.textContent;
        block1Link.textContent = block6Link.textContent;
        block6Link.textContent = tempText;
        console.log('Content swapped!');
    } else {``
        console.error('One of the elements was not found.');
    }
});

document.getElementById('calculateAreaBtn').addEventListener('click', () => {
    const radius = prompt("Enter the radius of the circle:");
    if (radius) {
        const block3 = document.querySelector('.block3');
        const area = Math.PI * Math.pow(Number(radius), 2);
        const resultParagraph = document.createElement('h1');
        resultParagraph.textContent = `Area of ​​a circle with radius ${radius} is equal to ${area.toFixed(2)}.`;
        block3.appendChild(resultParagraph);
    }
});

document.getElementById('formCookiesBtn').addEventListener('click', () => {
    const cookieName = 'maxNumbersResult';
    const existingCookie = document.cookie.split('; ').find(row => row.startsWith(cookieName));
    if (existingCookie) {
        const cookieValue = existingCookie.split('=')[1];
        const userConsent = confirm(`Data stored in cookies: ${cookieValue}. Delete data?`);
        if (userConsent) {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            alert('Data deleted. The page will be reloaded.');
            location.reload();
        } else {
            alert('The data remains in cookies. To update the form, reload the page.');
        }
        return;
    }
    const controls = document.querySelector('.controls');
    const form = document.createElement('form');
    form.innerHTML = `<label>Enter 10 numbers separated by a comma: <input type="text" id="numbersInput" placeholder="Example: 1,2,3,4,5,6,7,8,9,10"></label><button type="button" id="calculateMax">Calculate</button>`;
    controls.insertAdjacentElement('beforeend', form);
    document.querySelector('#calculateMax').addEventListener('click', () => {
        const input = document.querySelector('#numbersInput').value;
        const numbers = input.split(',').map(Number);

        if (numbers.length !== 10 || numbers.some(isNaN)) {
            alert('Please, enter exactly 10 numbers separated by a comma.');
            return;
        }
        const max = Math.max(...numbers);
        const countMax = numbers.filter(num => num === max).length;
        document.cookie = `${cookieName}=${countMax}; path=/;`;
        alert(`Maximum number: ${max}, amount of such numbers: ${countMax}`);
    });
});

document.getElementById('changeColorBtn').addEventListener('click', () => {
    const controls = document.querySelector('.controls');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter a color';
    input.style.marginTop = '10px';
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.marginLeft = '10px';
    controls.insertAdjacentElement('beforeend', input);
    controls.insertAdjacentElement('beforeend', saveButton);
    const isValidColor = (color) => {
        const testElement = document.createElement('div');
        testElement.style.backgroundColor = color;
        return testElement.style.backgroundColor !== '';
    };
    const saveColor = () => {
        const newColor = input.value.trim();
        if (isValidColor(newColor)) {
            const block2 = document.querySelector('.block2');
            block2.style.backgroundColor = newColor;
            localStorage.setItem('block2BackgroundColor', newColor);
            alert(`Color "${newColor}" has been saved!`);
            input.remove();
            saveButton.remove();
        } else {
            alert('Invalid color! Please enter a valid CSS color.');
            input.value = '';
            input.focus();
        }
    };
    saveButton.addEventListener('click', saveColor);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            saveColor();
        }
    });
    input.focus();
});

document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('block2BackgroundColor');
    if (savedColor) {
        document.querySelector('.block2').style.backgroundColor = savedColor;
    }
});

document.getElementById('clearLocalStorageBtn').addEventListener('click', () => {
    const userConfirmation = confirm("Are you sure you want to clear local storage?");
    if (userConfirmation) {
        localStorage.clear();
        alert("Local storage cleared!");
        location.reload();
    }
});

document.getElementById('editContentBtn').addEventListener('click', () => {
    document.querySelectorAll('.block').forEach((block, index) => {
        if (block.querySelector('.edit-link')) {
            return;
        }
        const editLink = document.createElement('a');
        editLink.textContent = 'Edit';
        editLink.href = '#';
        editLink.classList.add('edit-link');
        editLink.style.display = 'block';
        editLink.style.marginTop = '10px';
        const initialContent = block.dataset.initialContent || block.innerHTML;
        const initialColor = block.dataset.initialColor || block.style.backgroundColor || '';
        block.dataset.initialContent = initialContent;
        block.dataset.initialColor = initialColor;
        block.appendChild(editLink);
        editLink.addEventListener('click', (event) => {
            event.preventDefault();
            editLink.style.display = 'none';
            const textarea = document.createElement('textarea');
            const saveButton = document.createElement('button');
            textarea.value = block.innerHTML;
            saveButton.textContent = 'Save';
            block.appendChild(textarea);
            block.appendChild(saveButton);
            saveButton.addEventListener('click', () => {
                const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                const newContent = textarea.value;
                block.innerHTML = newContent;
                block.style.backgroundColor = newColor;
                const blockData = {
                    content: newContent,
                    color: newColor
                };
                localStorage.setItem(`block${index + 1}`, JSON.stringify(blockData));
                addEditLinkAndResetButton(block, initialContent, initialColor, index);
            });
        });
    });
});

function addEditLinkAndResetButton(block, initialContent, initialColor, index) {
    const existingEditLink = block.querySelector('.edit-link');
    const existingResetButton = block.querySelector('.reset-button');
    if (existingEditLink) {
        existingEditLink.remove();
    }
    if (existingResetButton) {
        existingResetButton.remove();
    }
    const editLink = document.createElement('a');
    editLink.textContent = 'Edit';
    editLink.href = '#';
    editLink.classList.add('edit-link');
    editLink.style.display = 'block';
    editLink.style.marginTop = '10px';
    block.appendChild(editLink);
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Clear Local Storage';
    resetButton.style.marginTop = '10px';
    resetButton.classList.add('reset-button');
    block.appendChild(resetButton);
    editLink.addEventListener('click', (event) => {
        event.preventDefault();
        editLink.style.display = 'none';
        const textarea = document.createElement('textarea');
        const saveButton = document.createElement('button');
        textarea.value = block.innerHTML;
        saveButton.textContent = 'Save';
        block.appendChild(textarea);
        block.appendChild(saveButton);

        saveButton.addEventListener('click', () => {
            const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            const newContent = textarea.value;
            block.innerHTML = newContent;
            block.style.backgroundColor = newColor;

            const blockData = {
                content: newContent,
                color: newColor
            };
            localStorage.setItem(`block${index + 1}`, JSON.stringify(blockData));
            addEditLinkAndResetButton(block, initialContent, initialColor, index);
        });
    });

    resetButton.addEventListener('click', () => {
        localStorage.removeItem(`block${index + 1}`);
        block.innerHTML = initialContent;
        block.style.backgroundColor = initialColor;
        resetButton.remove();
        const existingEditLink = block.querySelector('.edit-link');
        if (!existingEditLink) {
            const editLink = document.createElement('a');
            editLink.textContent = 'Edit';
            editLink.href = '#';
            editLink.classList.add('edit-link');
            editLink.style.display = 'block';
            editLink.style.marginTop = '10px';
            block.appendChild(editLink);
            editLink.addEventListener('click', (event) => {
                event.preventDefault();
                editLink.style.display = 'none';
                const textarea = document.createElement('textarea');
                const saveButton = document.createElement('button');
                textarea.value = block.innerHTML;
                saveButton.textContent = 'Save';
                block.appendChild(textarea);
                block.appendChild(saveButton);
                saveButton.addEventListener('click', () => {
                    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                    const newContent = textarea.value;
                    block.innerHTML = newContent;
                    block.style.backgroundColor = newColor;
                    const blockData = {
                        content: newContent,
                        color: newColor,
                    };
                    localStorage.setItem(`block${index + 1}`, JSON.stringify(blockData));
                    addEditLinkAndResetButton(block, initialContent, initialColor, index);
                });
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.block').forEach((block, index) => {
        const initialContent = block.innerHTML;
        const initialColor = block.style.backgroundColor || '';
        block.dataset.initialContent = initialContent;
        block.dataset.initialColor = initialColor;
        const savedData = localStorage.getItem(`block${index + 1}`);
        if (savedData) {
            const { content, color } = JSON.parse(savedData);
            block.innerHTML = content;
            block.style.backgroundColor = color;
            addEditLinkAndResetButton(block, initialContent, initialColor, index);
        }
    });
});
