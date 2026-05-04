 const input = document.getElementById('searchInput');
        input.addEventListener('keyup', function () {
            const keyword = this.value.toLowerCase();
            const rows = document.querySelectorAll('.player-row');

            rows.forEach(row => {
                const nameEl = row.querySelector('.player-name');
                const originalText = nameEl.textContent;

                if (originalText.toLowerCase().includes(keyword)) {
                    row.style.display = '';
                    if (keyword !== '') {
                        const regex = new RegExp(`(${keyword})`, 'gi');
                        nameEl.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
                    } else {
                        nameEl.textContent = originalText;
                    }
                } else {
                    row.style.display = 'none';
                }
            });
        });