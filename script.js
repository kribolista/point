async function checkPoints() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Kosongkan hasil sebelumnya

    const addresses = document.getElementById("walletAddresses").value
        .split('\n')
        .map(addr => addr.trim())
        .filter(addr => addr);

    if (addresses.length === 0) {
        resultsDiv.innerHTML = "Masukkan alamat wallet yang valid.";
        return;
    }

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    for (let address of addresses) {
        try {
            const apiUrl = `https://trailblazer.mainnet.taiko.xyz/s2/user/rank?address=${address}`;
            const response = await fetch(proxyUrl + apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const points = data.points || "Tidak ditemukan";
            resultsDiv.innerHTML += `<p>Wallet ${address}: ${points} poin</p>`;
        } catch (error) {
            console.error("Gagal memuat data:", error);
            resultsDiv.innerHTML += `<p>Wallet ${address}: Gagal memuat data - ${error.message}</p>`;
        }
    }
}
