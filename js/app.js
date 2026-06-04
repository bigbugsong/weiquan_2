/* 消费维权服务站 — 弹窗与交互 (vanilla, 与 jQuery 表单逻辑互不干扰) */
(function () {
    function ready(fn) {
        if (document.readyState !== "loading") { fn(); return; }
        document.addEventListener("DOMContentLoaded", fn);
    }

    ready(function () {
        var body = document.body;
        var openModals = [];

        function openModal(modal) {
            if (!modal) return;
            // 投诉/反馈表单：每次打开重置为默认空状态（清空已填内容 + 校验红框/提示 + 字数）
            if (modal.id === "feedbackModal") {
                var fbForm = modal.querySelector("form");
                if (fbForm && typeof fbForm.reset === "function") { fbForm.reset(); }
                Array.prototype.forEach.call(modal.querySelectorAll(".gov-field.is-error"), function (f) { f.classList.remove("is-error"); });
                Array.prototype.forEach.call(modal.querySelectorAll(".gov-field__msg"), function (m) { if (m.parentNode) { m.parentNode.removeChild(m); } });
                if (typeof govCharCount === "function") { govCharCount(); }
            }
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            body.classList.add("modal-lock");
            body.style.overflow = "hidden";
            openModals.push(modal);
            var focusable = modal.querySelector(".gov-modal__close");
            if (focusable) { try { focusable.focus(); } catch (e) {} }
        }

        function closeModal(modal) {
            if (!modal) return;
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            openModals = openModals.filter(function (m) { return m !== modal; });
            if (!openModals.length) {
                body.classList.remove("modal-lock");
                body.style.overflow = "";
            }
        }

        /* buttons that open a modal by id: [data-open="modalId"] */
        Array.prototype.forEach.call(document.querySelectorAll("[data-open]"), function (btn) {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                openModal(document.getElementById(btn.getAttribute("data-open")));
            });
        });

        /* article reading modal, populated from each card's hidden full content */
        var articleModal = document.getElementById("articleModal");
        var articleTitle = document.getElementById("articleModalTitle");
        var articleContent = document.getElementById("articleModalContent");

        function openArticle(card) {
            if (!articleModal) return;
            var full = card.querySelector(".doc-card__full");
            var titleEl = card.querySelector(".doc-card__title");
            articleTitle.textContent = titleEl ? titleEl.textContent.trim() : "内容详情";
            articleContent.innerHTML = full ? full.innerHTML : "";
            // 去掉与弹窗标题重复的首个标题（避免标题出现两次）
            var firstEl = articleContent.firstElementChild;
            if (firstEl && /^H[1-4]$/.test(firstEl.tagName) &&
                firstEl.textContent.trim() === articleTitle.textContent) {
                articleContent.removeChild(firstEl);
            }
            articleContent.scrollTop = 0;
            openModal(articleModal);
        }

        Array.prototype.forEach.call(document.querySelectorAll(".doc-card"), function (card) {
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.addEventListener("click", function () { openArticle(card); });
            card.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openArticle(card); }
            });
        });

        /* close: 仅关闭按钮 [data-close]（点击弹窗外遮罩区域不关闭）；Esc 仍可关闭 */
        Array.prototype.forEach.call(document.querySelectorAll(".gov-modal"), function (modal) {
            Array.prototype.forEach.call(modal.querySelectorAll("[data-close]"), function (btn) {
                btn.addEventListener("click", function () { closeModal(modal); });
            });
        });

        document.addEventListener("keyup", function (e) {
            if (e.key === "Escape" && openModals.length) {
                closeModal(openModals[openModals.length - 1]);
            }
        });
    });
}());
