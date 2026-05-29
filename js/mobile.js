(function () {
    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
            return;
        }
        document.addEventListener("DOMContentLoaded", fn);
    }

    function removeBreaks(root) {
        var breaks = root.querySelectorAll("br");
        Array.prototype.forEach.call(breaks, function (item) {
            item.parentNode.removeChild(item);
        });
    }

    function cleanArticleHtml(html) {
        var container = document.createElement("div");
        container.innerHTML = html;
        removeBreaks(container);
        return container.innerHTML;
    }

    ready(function () {
        var cards = document.querySelectorAll(".wq03 .gzzd, .wq03 .xfzy, .wq033 .gzzd, .wq033 .xfzy");
        var modal = document.getElementById("articleModal");
        var modalTitle = document.getElementById("articleModalTitle");
        var modalContent = document.getElementById("articleModalContent");
        var closeButton = modal ? modal.querySelector(".article-modal-close") : null;

        if (!cards.length || !modal || !modalTitle || !modalContent || !closeButton) {
            return;
        }

        Array.prototype.forEach.call(cards, function (card) {
            if (card.querySelector(".article-open")) {
                return;
            }

            var title = card.querySelector("h3");
            var originalHtml = cleanArticleHtml(card.innerHTML);
            var previewShell = document.createElement("div");
            var preview = document.createElement("div");
            var fade = document.createElement("div");
            var button = document.createElement("button");

            previewShell.className = "article-preview-shell";
            preview.className = "article-preview";
            fade.className = "article-fade";

            button.type = "button";
            button.className = "article-open";
            button.textContent = "查看全文";

            while (title && title.nextSibling) {
                preview.appendChild(title.nextSibling);
            }
            removeBreaks(preview);

            fade.appendChild(button);
            previewShell.appendChild(preview);
            previewShell.appendChild(fade);
            card.appendChild(previewShell);

            button.onclick = function () {
                modalTitle.textContent = title ? title.textContent.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "") : "内容详情";
                modalContent.innerHTML = originalHtml;
                modal.className = "article-modal article-modal-on";
                modal.setAttribute("aria-hidden", "false");
                document.body.className += " modal-lock";
            };
        });

        function closeModal() {
            modal.className = "article-modal";
            modal.setAttribute("aria-hidden", "true");
            document.body.className = document.body.className.replace(/\s?modal-lock/g, "");
        }

        closeButton.onclick = closeModal;
        modal.onclick = function (event) {
            if (event.target === modal) {
                closeModal();
            }
        };
        document.addEventListener("keyup", function (event) {
            if (event.key === "Escape" && modal.className.indexOf("article-modal-on") !== -1) {
                closeModal();
            }
        });
    });
}());
