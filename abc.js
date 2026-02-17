(function() {
    console.log('JS-filen laddades!');
    const script = document.currentScript;
    const customerId = script ? script.getAttribute('data-customer-id') || 'OKAND' : 'OKAND';
    const webhookUrl = script ? script.getAttribute('data-webhook-url') : null;
    if (!webhookUrl) {
        console.error('Webhook-URL saknas. Lägg till data-webhook-url i script-taggen.');
    }
    const style = document.createElement('style');
    style.textContent = `
        body{font-family:'Inter',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:0;padding:0;min-height:100vh;background:#f0f2f5}
        .trigger-btn{
            position:fixed;top:16px;right:60px;z-index:999999;padding:12px 24px;
            background:rgba(255,255,255,0.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
            color:#000;border:1px solid rgba(255,255,255,0.3);border-radius:8px;
            font-size:1rem;font-weight:600;cursor:pointer;
            box-shadow:0 4px 12px rgba(0,0,0,0.15);
            transition:all .3s;
            animation: shake 10s infinite;
        }
        .trigger-btn:hover{
            background:rgba(255,255,255,0.4);
            transform:translateY(-2px);
            box-shadow:0 8px 24px rgba(0,0,0,0.2);
            animation-play-state:paused;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            2% { transform: translateX(-8px) rotate(-1deg); }
            4% { transform: translateX(8px) rotate(1deg); }
            6% { transform: translateX(-8px) rotate(-0.5deg); }
            8%, 100% { transform: translateX(0) rotate(0deg); }
        }
        .modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999999;justify-content:center;align-items:center;overflow-y:auto;padding:20px}
        .modal-content{background:rgba(255,255,255,0.35);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:8px;border:1px solid rgba(255,255,255,0.25);box-shadow:0 8px 32px rgba(0,0,0,0.37);width:100%;max-width:720px;overflow:hidden;position:relative}
        .close-btn{position:absolute;top:16px;right:20px;font-size:2rem;color:#333;cursor:pointer}
        .close-btn:hover{color:#e74c3c}
        .modal-body{padding:32px 24px 24px;max-height:85vh;overflow-y:auto}
        h1{margin:0 0 24px;font-size:1.8rem;text-align:center;color:#111}
        h2{margin:0 0 16px;color:#929292;font-weight:500;font-size:1.2rem}
        form{display:flex;flex-direction:column;gap:8px}
        .section{background:rgba(255,255,255,0.4);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:8px;padding:20px;border:1px solid rgba(255,255,255,0.3);transition:all .6s ease-out}
        .section.collapsed{max-height:0;overflow:hidden;opacity:0;padding:0;margin:0;transform:translateY(-10px)}
        .field-wrapper{position:relative;margin-bottom:8px}
        .field-wrapper label{position:absolute;top:50%;left:16px;transform:translateY(-50%);color:#929292;font-size:14px;font-weight:400;pointer-events:none;transition:all .25s ease;transform-origin:0 0}
        .field-wrapper input:focus+label,.field-wrapper input:not(:placeholder-shown)+label,
        .field-wrapper select:focus+label,.field-wrapper select:not(:placeholder-shown)+label,
        .field-wrapper textarea:focus+label,.field-wrapper textarea:not(:placeholder-shown)+label{
            top:0;left:12px;font-size:10px;transform:translateY(0);background:transparent
        }
        input,select,textarea{width:100%;padding:14px 16px !important;background:rgba(255,255,255,0.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(0,0,0,0.08);border-radius:8px;font-family:'Inter',sans-serif !important;font-size:14px !important;line-height:1.5 !important;color:#1a1a1a;box-sizing:border-box;transition:border-color .2s ease}
        input[type=text],input[type=tel],input[type=email],input[type=date]{padding:14px 16px !important}
        input:hover,select:hover,textarea:hover{border-color:#929292}
        input:focus,select:focus,textarea:focus{border-color:#929292;box-shadow:0 0 0 3px rgba(146,146,146,.15);outline:none}
        input:invalid,select:invalid,textarea:invalid{box-shadow:none;border-color:rgba(0,0,0,0.08)}
        .name-row{display:flex;gap:8px;margin-bottom:0}
        .name-row .field-wrapper{flex:1}
        .name-row #fornamn-wrapper{flex:0 0 40%}
        .address-row{display:flex;gap:8px;margin-bottom:0}
        .address-row .field-wrapper{flex:1}
        .address-row #postnummer-wrapper{flex:0 0 40%}
        textarea{min-height:80px;resize:vertical;font-family:'Inter',sans-serif !important;font-size:14px !important;line-height:1.5 !important;color:#1a1a1a}
        input::placeholder,textarea::placeholder{color:#929292;opacity:.7;text-align:left;vertical-align:top;padding-top:4px;padding-left:4px}
        button[type=submit]{padding:16px 40px;background:rgba(0,0,0,.65);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;border:none;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer;margin:24px auto 0;display:block;min-width:220px;box-shadow:0 6px 20px rgba(0,0,0,.35);transition:all .25s}
        button[type=submit]:hover{background:rgba(0,0,0,.8);transform:translateY(-2px)}
        .success-message{text-align:center;padding:40px 20px;font-size:1.3rem;color:#666666;font-weight:500;border-radius:8px;margin:20px 0}
        @media (max-width:640px){.modal-body{padding:24px 16px 16px}.name-row,.address-row{flex-direction:column;gap:8px}.name-row .field-wrapper,.address-row .field-wrapper{flex:1 1 100%!important}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.className = 'trigger-btn';
    btn.textContent = 'Få offert på städhjälp';
    document.body.appendChild(btn);

    const modalHTML = `
        <div class="modal" id="quoteModal">
            <div class="modal-content">
                <span class="close-btn" id="closeModal">×</span>
                <div class="modal-body">
                    <h1>Offertförfrågan på städhjälp</h1>
                    <div id="formContent">
                        <form id="quoteForm" action="${webhookUrl}" method="POST" novalidate>
                            <input type="hidden" name="customer_id" value="${customerId}">
                            <input type="hidden" name="origin_url" value="${encodeURIComponent(window.location.href)}">

                            <div class="section" id="main-section">
                                <h2>Information om städningen</h2>
                                <div class="field-wrapper">
                                    <input type="date" id="cleaning_date" name="cleaning_date" required placeholder=" ">
                                    <label for="cleaning_date">Städdatum</label>
                                </div>
                                <div class="field-wrapper">
                                    <select id="customer_type" name="customer_type" required>
                                        <option value="" disabled selected></option>
                                        <option value="privat">Privat</option>
                                        <option value="foretag">Företag</option>
                                        <option value="brf">Bostadsrättsförening</option>
                                    </select>
                                    <label for="customer_type">Typ av kund</label>
                                </div>
                                <div class="field-wrapper">
                                    <select id="cleaning_type" name="cleaning_type" required>
                                        <option value="" disabled selected></option>
                                        <option value="flyttstad">Flyttstäd</option>
                                        <option value="hemstad">Hemstäd</option>
                                        <option value="storstad">Storstäd</option>
                                        <option value="visningsstad">Visningsstäd</option>
                                        <option value="byggstad">Byggstäd</option>
                                        <option value="fonsterputs">Fönsterputs</option>
                                    </select>
                                    <label for="cleaning_type">Typ av städning</label>
                                </div>
                                <div class="field-wrapper">
                                    <input type="number" id="kvm" name="kvm" min="1" required placeholder=" ">
                                    <label for="kvm">Antal kvm</label>
                                </div>
                                <div class="field-wrapper">
                                    <select id="balcony" name="balcony">
                                        <option value="nej">Nej</option>
                                        <option value="liten">Ja, liten</option>
                                        <option value="stor">Ja, stor</option>
                                    </select>
                                    <label for="balcony">Inglasad balkong?</label>
                                </div>
                                <div class="field-wrapper">
                                    <textarea id="other_info" name="other_info" rows="3" placeholder=" "></textarea>
                                    <label for="other_info">Övrig information / särskilda önskemål</label>
                                </div>
                            </div>

                            <div class="section collapsed" id="address-section">
                                <h2>Adress</h2>
                                <div class="field-wrapper">
                                    <input type="text" id="gatuadress" name="gatuadress" required placeholder=" ">
                                    <label for="gatuadress">Gatuadress</label>
                                </div>
                                <div class="address-row">
                                    <div class="field-wrapper" id="postnummer-wrapper">
                                        <input type="text" id="postnummer" name="postnummer" required placeholder=" ">
                                        <label for="postnummer">Postnummer</label>
                                    </div>
                                    <div class="field-wrapper">
                                        <input type="text" id="stad" name="stad" required placeholder=" ">
                                        <label for="stad">Stad</label>
                                    </div>
                                </div>
                            </div>

                            <div class="section collapsed" id="contact-section">
                                <h2>Kontaktuppgifter</h2>
                                <div class="name-row">
                                    <div class="field-wrapper" id="fornamn-wrapper">
                                        <input type="text" id="fornamn" name="fornamn" required placeholder=" ">
                                        <label for="fornamn">Förnamn</label>
                                    </div>
                                    <div class="field-wrapper" id="efternamn-wrapper">
                                        <input type="text" id="efternamn" name="efternamn" required placeholder=" ">
                                        <label for="efternamn">Efternamn</label>
                                    </div>
                                </div>
                                <div class="field-wrapper">
                                    <input type="tel" id="telefon" name="telefon" required placeholder=" ">
                                    <label for="telefon">Telefonnummer</label>
                                </div>
                                <div class="field-wrapper">
                                    <input type="email" id="email" name="email" required placeholder=" ">
                                    <label for="email">Email</label>
                                </div>
                            </div>

                            <button type="submit">Skicka förfrågan</button>
                        </form>
                    </div>
                    <div id="successMessage" class="success-message" style="display:none;">
                        Tack för din förfrågan! Vi återkommer så snart som möjligt.
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    const modal = document.getElementById('quoteModal');
    const formContent = document.getElementById('formContent');
    const successMessage = document.getElementById('successMessage');
    const openBtn = btn;
    const closeBtn = document.getElementById('closeModal');

    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    const mainSection = document.getElementById('main-section');
    const addressSection = document.getElementById('address-section');
    const contactSection = document.getElementById('contact-section');

    const mainRequired = mainSection.querySelectorAll('[required]');
    const addressRequired = addressSection.querySelectorAll('[required]');

    function checkMainFilled() {
        let filled = true;
        mainRequired.forEach(input => {
            if (!input.value.trim()) filled = false;
        });
        if (filled) addressSection.classList.remove('collapsed');
    }

    function checkAddressFilled() {
        let filled = true;
        addressRequired.forEach(input => {
            if (!input.value.trim()) filled = false;
        });
        if (filled) contactSection.classList.remove('collapsed');
    }

    mainRequired.forEach(input => {
        input.addEventListener('input', () => { checkMainFilled(); checkAddressFilled(); });
        input.addEventListener('change', () => { checkMainFilled(); checkAddressFilled(); });
    });

    addressRequired.forEach(input => {
        input.addEventListener('input', checkAddressFilled);
        input.addEventListener('change', checkAddressFilled);
    });

    checkMainFilled();
    checkAddressFilled();

    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        e.preventDefault();

        let valid = true;
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.setCustomValidity('Info saknas här');
                valid = false;
            } else {
                field.setCustomValidity('');
            }
        });

        if (!valid) {
            this.reportValidity();
            return;
        }

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                formContent.style.display = 'none';
                successMessage.style.display = 'block';
            } else {
                alert('Något gick fel vid skickandet. Försök igen.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Något gick fel vid skickandet. Försök igen.');
        });
    });
})();
