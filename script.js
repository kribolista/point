async function checkPoints() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Kosongkan hasil sebelumnya

    const addresses = document.getElementById("walletAddresses").value.split('\n').map(addr => addr.trim()).filter(addr => addr);

    if (addresses.length === 0) {
        resultsDiv.innerHTML = "Masukkan alamat wallet yang valid.";
        return;
    }

    for (let address of addresses) {
        try {
            const response = await fetch(`https://trailblazer.mainnet.taiko.xyz/s2/user/rank?address=${address}`);
            if (!response.ok) throw new Error("Gagal mendapatkan data");

            const data = await response.json();
            const points = data.points || "Tidak ditemukan";
            resultsDiv.innerHTML += `<p>Wallet ${address}: ${points} poin</p>`;
        } catch (error) {
            resultsDiv.innerHTML += `<p>Wallet ${address}: Gagal memuat data</p>`;
        }
    }
}