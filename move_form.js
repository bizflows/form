(function() {
    // Hämta kund-ID från script-taggen (data-customer-id="...")
    const script = document.currentScript;
    const customerId = script ? script.getAttribute('data-customer-id') || 'OKAND' : 'OKAND';

    // Lägg till all CSS dynamiskt
    const style = document.createElement('style');
    style.textContent = `body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:0;padding:0;min-height:100vh;background:#f0f2f5}.trigger-btn{position:fixed;top:16px;right:16px;z-index:1000;padding:12px 24px;background:rgba(255,255,255,0.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#000;border:1px solid rgba(255,255,255,0.3);border-radius:50px;font-size:1rem;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:all .3s}.trigger-btn:hover{background:rgba(255,255,255,0.4)}.modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;justify-content:center;align-items:center;overflow-y:auto;padding:20px}.modal-content{background:rgba(255,255,255,0.35);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;border:1px solid rgba(255,255,255,0.25);box-shadow:0 8px 32px rgba(0,0,0,0.37);width:100%;max-width:860px;overflow:hidden;position:relative}.close-btn{position:absolute;top:16px;right:20px;font-size:2rem;color:#333;cursor:pointer}.close-btn:hover{color:#e74c3c}.modal-body{padding:40px 30px 30px;max-height:85vh;overflow-y:auto}h1{margin:0 0 30px;font-size:2rem;text-align:center;color:#111}h2,h3{margin:0 0 20px;color:#222}form{display:flex;flex-direction:column;gap:20px}.section{background:rgba(255,255,255,0.4);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:20px;padding:24px;border:1px solid rgba(255,255,255,0.3)}label{display:block;margin-bottom:8px;font-weight:500;color:#222}input,select,textarea{width:100%;padding:14px;background:rgba(255,255,255,0.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.4);border-radius:16px;font-size:1rem;color:#000;box-sizing:border-box}input:focus,select:focus,textarea:focus{border-color:rgba(0,122,255,0.6);box-shadow:0 0 0 3px rgba(0,122,255,0.15);outline:none}.hidden{display:none}.checkbox-group{display:flex;flex-direction:column;gap:16px;margin-top:12px}.checkbox-group label{display:flex;align-items:center;gap:14px;font-size:1.1rem;color:#222;cursor:pointer;user-select:none}.custom-checkbox{position:relative;width:28px;height:28px;flex-shrink:0}.custom-checkbox input[type=checkbox]{opacity:0;width:0;height:0;position:absolute}.checkmark{position:absolute;inset:0;background:rgba(255,255,255,0.75);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);border:1.5px solid rgba(0,0,0,0.18);border-radius:8px;transition:all .18s}.custom-checkbox input:checked + .checkmark{background:rgba(255,255,255,0.9);border-color:#34c759}.checkmark:after{content:"";position:absolute;display:none;left:9px;top:4px;width:9px;height:15px;border:solid #34c759;border-width:0 3.5px 3.5px 0;transform:rotate(45deg)}.custom-checkbox input:checked + .checkmark:after{display:block}button[type=submit]{padding:16px 40px;background:rgba(0,0,0,0.65);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;border:1px solid rgba(255,255,255,0.15);border-radius:999px;font-size:1.15rem;font-weight:600;cursor:pointer;margin:32px auto 0;display:block;min-width:240px;box-shadow:0 6px 20px rgba(0,0,0,0.35);transition:all .25s}button[type=submit]:hover{background:rgba(0,0,0,0.8);transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,0.45)}button[type=submit]:active{transform:translateY(0)}@media (max-width:640px){.modal-body{padding:30px 20px 20px}button[type=submit]{min-width:200px;padding:14px 32px}}`;
    document.head.appendChild(style);

    // Skapa knappen
    const btn = document.createElement('button');
    btn.className = 'trigger-btn';
    btn.textContent = 'Få offert på flytt';
    document.body.appendChild(btn);

    // Skapa hela modal + formulär som HTML-sträng
    const modalHTML = `
        <div class="modal" id="quoteModal">
            <div class="modal-content">
                <span class="close-btn" id="closeModal">×</span>
                <div class="modal-body">
                    <h1>Offertförfrågan för Flytthjälp</h1>
                    <form id="quoteForm" action="https://hook.eu1.make.com/kwnhnpzfpt353a8auu9nfh3jsheog3hk" method="POST">
                        <input type="hidden" name="customer_id" value="${customerId}">
                        <input type="hidden" name="origin_url" value="${encodeURIComponent(window.location.href)}">

                        <div class="section">
                            <h2>Flytta från</h2>
                            <label for="from_address">Adress:</label><input type="text" id="from_address" name="from_address" required>
                            <label for="from_postnummer">Postnummer:</label><input type="text" id="from_postnummer" name="from_postnummer" required>
                            <label for="from_stad">Stad:</label><input type="text" id="from_stad" name="from_stad" required>
                            <label for="from_land">Land:</label><input type="text" id="from_land" name="from_land" value="Sverige" required>
                            <label for="from_typ">Typ av bostad:</label>
                            <select id="from_typ" name="from_typ" required>
                                <option value="">Välj...</option>
                                <option value="villa">Villa</option>
                                <option value="lägenhet">Lägenhet</option>
                                <option value="radhus">Radhus</option>
                                <option value="kontor">Kontor</option>
                                <option value="lager">Lager</option>
                            </select>
                            <div id="from_apartment_details" class="hidden">
                                <label for="from_vaning">Våningsplan:</label><input type="number" id="from_vaning" name="from_vaning" min="1">
                                <label for="from_hiss">Hiss:</label>
                                <select id="from_hiss" name="from_hiss">
                                    <option value="">Välj...</option>
                                    <option value="ja_liten">Ja, liten</option>
                                    <option value="ja_stor">Ja, stor</option>
                                    <option value="nej">Nej</option>
                                </select>
                            </div>
                            <label for="from_avstand">Avstånd lastplats → entré (m):</label><input type="number" id="from_avstand" name="from_avstand" min="0">
                            <label for="from_forad">Förråd:</label>
                            <select id="from_forad" name="from_forad">
                                <option value="">Inget</option>
                                <option value="vind">Vind</option>
                                <option value="källare">Källare</option>
                                <option value="garage">Garage</option>
                                <option value="annat">Annat</option>
                            </select>
                            <label for="from_bostad_kvm">Bostad (kvm):</label><input type="number" id="from_bostad_kvm" name="from_bostad_kvm" min="0">
                            <label for="from_forad_kvm">Förråd (kvm):</label><input type="number" id="from_forad_kvm" name="from_forad_kvm" min="0">
                        </div>

                        <div class="section">
                            <h2>Flytta till</h2>
                            <label for="to_address">Adress:</label><input type="text" id="to_address" name="to_address" required>
                            <label for="to_postnummer">Postnummer:</label><input type="text" id="to_postnummer" name="to_postnummer" required>
                            <label for="to_stad">Stad:</label><input type="text" id="to_stad" name="to_stad" required>
                            <label for="to_land">Land:</label><input type="text" id="to_land" name="to_land" value="Sverige" required>
                            <label for="to_typ">Typ av bostad:</label>
                            <select id="to_typ" name="to_typ" required>
                                <option value="">Välj...</option>
                                <option value="villa">Villa</option>
                                <option value="lägenhet">Lägenhet</option>
                                <option value="radhus">Radhus</option>
                                <option value="kontor">Kontor</option>
                                <option value="lager">Lager</option>
                            </select>
                            <div id="to_apartment_details" class="hidden">
                                <label for="to_vaning">Våningsplan:</label><input type="number" id="to_vaning" name="to_vaning" min="1">
                                <label for="to_hiss">Hiss:</label>
                                <select id="to_hiss" name="to_hiss">
                                    <option value="">Välj...</option>
                                    <option value="ja_liten">Ja, liten</option>
                                    <option value="ja_stor">Ja, stor</option>
                                    <option value="nej">Nej</option>
                                </select>
                            </div>
                            <label for="to_avstand">Avstånd lastplats → entré (m):</label><input type="number" id="to_avstand" name="to_avstand" min="0">
                            <label for="to_forad">Förråd:</label>
                            <select id="to_forad" name="to_forad">
                                <option value="">Inget</option>
                                <option value="vind">Vind</option>
                                <option value="källare">Källare</option>
                                <option value="garage">Garage</option>
                                <option value="annat">Annat</option>
                            </select>
                            <label for="to_bostad_kvm">Bostad (kvm):</label><input type="number" id="to_bostad_kvm" name="to_bostad_kvm" min="0">
                            <label for="to_forad_kvm">Förråd (kvm):</label><input type="number" id="to_forad_kvm" name="to_forad_kvm" min="0">
                        </div>

                        <div class="section">
                            <h2>Kontaktuppgifter</h2>
                            <label for="fornamn">Förnamn:</label><input type="text" id="fornamn" name="fornamn" required>
                            <label for="efternamn">Efternamn:</label><input type="text" id="efternamn" name="efternamn" required>
                            <label for="email">Email:</label><input type="email" id="email" name="email" required>
                            <label for="telefon">Telefonnummer:</label><input type="tel" id="telefon" name="telefon" required>
                        </div>

                        <div class="section">
                            <h2>Övrigt</h2>
                            <label for="flyttdatum">Önskat flyttdatum:</label><input type="date" id="flyttdatum" name="flyttdatum" required>
                            <label for="flexibilitet">Flexibilitet (± dagar):</label><input type="number" id="flexibilitet" name="flexibilitet" min="0">
                            <label for="kommentarer">Eventuella kommentarer:</label><textarea id="kommentarer" name="kommentarer" rows="4"></textarea>
                            <div class="checkbox-group">
                                <h3>Tillval (valfritt):</h3>
                                <label><span class="custom-checkbox"><input type="checkbox" name="tillval[]" value="flyttstädning"><span class="checkmark"></span></span>Flyttstädning</label>
                                <label><span class="custom-checkbox"><input type="checkbox" name="tillval[]" value="packhjälp"><span class="checkmark"></span></span>Packhjälp</label>
                                <label><span class="custom-checkbox"><input type="checkbox" name="tillval[]" value="hyra_flyttlådor"><span class="checkmark"></span></span>Hyra flyttlådor</label>
                            </div>
                        </div>

                        <button type="submit">Skicka förfrågan</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Lägg till modalen i body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Event listeners
    const modal = document.getElementById('quoteModal');
    const openBtn = btn; // knappen vi skapade
    const closeBtn = document.getElementById('closeModal');

    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Toggle för lägenhetsdetaljer
    function toggleApartmentDetails(prefix) {
        const typeSelect = document.getElementById(prefix + '_typ');
        const detailsDiv = document.getElementById(prefix + '_apartment_details');
        if (!typeSelect || !detailsDiv) return;
        const update = () => {
            detailsDiv.classList.toggle('hidden', typeSelect.value !== 'lägenhet');
        };
        typeSelect.addEventListener('change', update);
        update(); // kör direkt vid laddning
    }

    toggleApartmentDetails('from');
    toggleApartmentDetails('to');
})();
