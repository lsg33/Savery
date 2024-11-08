        document.getElementById('agreeButton').onclick = function() {
            localStorage.setItem('agree', 'true');
            document.getElementById('policyModal').style.display = 'none';
            
            if (!didToken) {
                 document.getElementById('tokenModal').style.display = 'block'; 
            } else {
                 document.getElementById('gameSelectModal').style.display = 'block';
            }

        };

        document.getElementById('submitBTN').onclick = async function() {
            const tokenInput = document.getElementById('tokenInput').value;
            const tokenReal = await getToken();
            
            if (tokenInput === tokenReal) {  // Check if input exists and matches real token
                alert("Token is valid! Proceeding to game selection.");
                document.getElementById('tokenModal').style.display = 'none';
                document.getElementById('gameSelectModal').style.display = 'block'; 
                setCookie('didTokens', 'true', 2); // Set cookie only if the token is valid
            } else if (!tokenInput) {
                alert('Please enter a token before submitting.');
            } else {
                alert('Invalid token. Please try again.');
            }
        };

        async function getToken() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/lsg33/TEXSTT/refs/heads/main/stets');  // Use the 'raw' URL to fetch text content directly
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.text();
                console.log('Fetched data:', data);
                return data.trim(); // Return the fetched token, trimming whitespace
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                return null; // Return null if there's an error
            }
        }
