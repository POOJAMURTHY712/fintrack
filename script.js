async function fetchCategories() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch(`${API_BASE}/categories`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const categories = await res.json();
        console.log("Fetched categories:", categories); // debug

        if (!Array.isArray(categories)) {
            console.error("Invalid categories response:", categories);
            return;
        }

        const tableBody = document.getElementById("cat-table");
        if (tableBody) {
            tableBody.innerHTML = "";
            categories.forEach(c => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${c.name}</td><td>${c.type}</td>`;
                tableBody.appendChild(row);
            });
        }

        const categorySelect = document.getElementById("category");
        if (categorySelect) {
            categorySelect.innerHTML = `<option value="">-- Select category --</option>`;
            categories.forEach(c => {
                const option = document.createElement("option");
                // Use MongoDB _id if present, else id
                option.value = c._id || c.id;
                option.textContent = c.name;
                categorySelect.appendChild(option);
            });
        }

    } catch (err) {
        console.error("Error fetching categories:", err);
    }
}

async function fetchTransactions() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch(`${API_BASE}/transactions`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const transactions = await res.json();
        console.log("Fetched transactions:", transactions); // debug

        if (!Array.isArray(transactions)) {
            console.error("Invalid transactions response:", transactions);
            return;
        }

        const tableBody = document.getElementById("tx-table");
        if (!tableBody) return;
        tableBody.innerHTML = "";

        transactions.forEach(t => {
            const categoryName = typeof t.category === "object" ? t.category.name : t.category;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${t.date}</td>
                <td>${t.type}</td>
                <td>${categoryName || "—"}</td>
                <td>${t.amount}</td>
                <td>${t.description || ""}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error("Error fetching transactions:", err);
    }
}
