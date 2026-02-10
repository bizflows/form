const style = document.createElement('style');
style.textContent = `
    body{font-family:'Inter',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;margin:0;padding:0;min-height:100vh;background:#f0f2f5}
    .trigger-btn{position:fixed;top:16px;right:16px;z-index:1000;padding:12px 24px;background:rgba(255,255,255,0.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#000;border:1px solid rgba(255,255,255,0.3);border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:all .3s}
    .trigger-btn:hover{background:rgba(255,255,255,0.4)}
    .modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;justify-content:center;align-items:center;overflow-y:auto;padding:20px}
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
    .field-wrapper input:focus+label,
    .field-wrapper input:not(:placeholder-shown)+label,
    .field-wrapper select:focus+label,
    .field-wrapper select:not(:placeholder-shown)+label,
    .field-wrapper textarea:focus+label,
    .field-wrapper textarea:not(:placeholder-shown)+label{
        top:0;                      /* ← ändrat till 0px från toppen vid fokus/ifyllt */
        left:12px;
        font-size:10px;
        transform:translateY(0);
        background:transparent
    }
    input,select,textarea{
        width:100%;
        padding:14px 16px;          /* ← 14px padding på alla sidor */
        background:rgba(255,255,255,0.55);
        backdrop-filter:blur(8px);
        -webkit-backdrop-filter:blur(8px);
        border:1px solid rgba(0,0,0,0.08);
        border-radius:8px;
        font-family:'Inter',sans-serif;
        font-size:14px;
        line-height:1.4;
        color:#1a1a1a;
        box-sizing:border-box;
        transition:border-color .2s ease
    }
    input[type=text], input[type=tel], input[type=email]{
        padding:14px 16px;          /* ← säkerställer 14px även på text-inputs */
    }
    input:hover,select:hover,textarea:hover{border-color:#929292}
    input:focus,select:focus,textarea:focus{border-color:#929292;box-shadow:0 0 0 3px rgba(146,146,146,.15);outline:none}
    input:invalid,select:invalid,textarea:invalid{box-shadow:none;border-color:rgba(0,0,0,0.08)}
    .name-row{display:flex;gap:8px;margin-bottom:0}
    .name-row .field-wrapper{flex:1}
    .name-row #fornamn-wrapper{flex:0 0 40%}
    .address-row{display:flex;gap:8px;margin-bottom:0}
    .address-row .field-wrapper{flex:1}
    .address-row #postnummer-wrapper{flex:0 0 40%}
    textarea{min-height:80px;resize:vertical;font-family:'Inter',sans-serif;font-size:14px;line-height:1.4;color:#1a1a1a}
    input::placeholder,textarea::placeholder{color:#929292;opacity:.7;text-align:left;vertical-align:top;padding-top:4px;padding-left:4px}
    button[type=submit]{padding:16px 40px;background:rgba(0,0,0,.65);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;border:none;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer;margin:24px auto 0;display:block;min-width:220px;box-shadow:0 6px 20px rgba(0,0,0,.35);transition:all .25s}
    button[type=submit]:hover{background:rgba(0,0,0,.8);transform:translateY(-2px)}
    @media (max-width:640px){.modal-body{padding:24px 16px 16px}.name-row,.address-row{flex-direction:column;gap:8px}.name-row .field-wrapper,.address-row .field-wrapper{flex:1 1 100%!important}}
`;
    document.head.appendChild(style);

    // Resten av koden (knapp, modalHTML, event listeners, validering osv.) är oförändrad
    // ... klistra in resten av din befintliga kod här ...
})();
