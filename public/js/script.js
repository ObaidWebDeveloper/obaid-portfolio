const colorChange = document.querySelector(".change_color") || "";
const textElements = document.querySelector(".second_hd span");
const typeCursor = document.querySelector(".second_hd label");
const body = document.querySelector("body");

if (colorChange) {
    colorChange.oninput = function () {
        const value = this.value;
        body.style.cssText =
            `--mainColor:${value};
    --secondColor:${value == "#ffffff" ? "#000000" : value}1f;
    ${value == "#ffffff" ? "--color:#000000" : ""}`;
    }
}

if (textElements) {
    const texts = [
        "web developer",
        "software engineer",
        "youtuber",
        "markiting person",
        "designer"
    ]

    let speed = 100;

    let textindex = 0;
    let charcterindex = 0;

    function typeWriter() {
        if (charcterindex < texts[textindex].length) {
            textElements.innerHTML += texts[textindex].charAt(charcterindex);
            charcterindex++;
            typeCursor.style.animation = "";
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(eraseText, 1000);
            typeCursor.style.animation = "blink 0.5s infinite";
        }
    }

    function eraseText() {
        if (textElements.innerHTML.length > 0) {
            textElements.innerHTML = textElements.innerHTML.slice(0, -1);
            setTimeout(eraseText, 50);
            typeCursor.style.animation = "";
        } else {
            textindex = (textindex + 1) % texts.length;
            charcterindex = 0;
            setTimeout(typeWriter, 500);
        }
    }

    window.onload = typeWriter;
}

setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
}, 500)

$("form").off("submit").on("submit", function (e) {
    e.preventDefault();

    const formBtn = $(this).find("button");
    formBtn.prop("disabled", true);
    formBtn.text("Loading...");

    const formData = new FormData(this);
    let jsonObject = {};

    formData.forEach(function (value, key) {
        jsonObject[key] = value;
    });

    $.ajax({
        url: "/send",
        type: "POST",
        data: (jsonObject),
        success: function (data) {
            formBtn.prop("disabled", false);
            formBtn.text("send");

            $(".message_popup").css("display", "flex");
            $(".message_popup span").text(data.message);

            if (data.type === true) {
                $(".message_popup").addClass("success");
            } else if (data.type === false) {
                $(".message_popup").addClass("err");
            } else if (data.type === undefined) {
                $(".message_popup").addClass("warn");
            }


            let count = 9;
            const countIntev = setInterval(() => {
                if (count < 0) {
                    messageReset();
                } else {
                    $(".message_popup b").text(count + "s");
                    count--;
                }
            }, 1000);


            $(".message_popup i").on("click", function () {
                messageReset();
            })


            function messageReset() {
                clearInterval(countIntev);
                $(".message_popup").fadeOut(function () {
                    $(".message_popup b").text("10s");

                    $(this)
                        .removeClass("success")
                        .removeClass("err")
                        .removeClass("warn");
                })
            }
        }
    })
});