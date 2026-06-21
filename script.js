const dailyQuotes = [
  { text: "错误仍在累积。", source: "长门有希《凉宫春日系列》" },
  { text: "由统括这个银河系的资讯统合思念体，制造出来与有机生命体接触用的联系装置外星人，就是……我。", source: "长门有希《凉宫春日系列》" },
  { text: "在漫无止境的八月里，只有我记得每一次的循环。", source: "长门有希《凉宫春日系列》" },
  { text: "诚然！正义必将获胜！", source: "堂吉诃德《边狱巴士》" },
  { text: "前进吧，罗西南特！", source: "堂吉诃德《边狱巴士》" },
  { text: "该我闪耀之时已至！", source: "堂吉诃德《边狱巴士》" },
  { text: "真正的英雄必须克服艰难险阻！", source: "堂吉诃德《边狱巴士》" },
  { text: "最能使自己幸福的地方，那才是我的家。", source: "神尾观铃《AIR》" },
  { text: "满是晚霞的天空，我也喜欢哦。因为感觉好像可以回到那里去一样。", source: "神尾观铃《AIR》" },
  { text: "在天空中，从很小的时候就觉得……只是总觉得另一个我在那里，那样很罗曼蒂克吧。", source: "神尾观铃《AIR》" },
  { text: "人们要是没有回忆就活不下去，但是只有回忆的话也活不下去。梦总是有会醒来的时候，不会醒的梦总有一天会变成悲伤。", source: "神尾观铃《AIR》" },
  { text: "时间残酷，总是会要求我们做出选择。", source: "《无职转生》" },
  { text: "生为男儿，心中总需持把剑，保护重要的事物，需要在心中做好觉悟。", source: "《无职转生》" },
  { text: "讨人厌的家伙或是没用的家伙都会以自己的方式努力。", source: "《无职转生》" },
  { text: "不偶尔抛下一切轻松一下的话，人是活不下去的。", source: "《无职转生》" },
  { text: "不甘心，不甘心得快要死了。", source: "黄前久美子《吹响吧！上低音号》" },
  { text: "人真是单纯，一旦知道有回报，就会去努力。努力若有成果，就会加倍努力。", source: "黄前久美子《吹响吧！上低音号》" },
  { text: "神会对努力之人微笑，这是骗人的，但我们偶然会被命运之神垂青。", source: "黄前久美子《吹响吧！上低音号》" },
  { text: "那时我发现，我已经迈出了新的一步。以及，现在的我已不再后悔。", source: "黄前久美子《吹响吧！上低音号》" },
];

function pickDailyQuote() {
  const quote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
  document.getElementById("quoteText").textContent = quote.text;
  document.getElementById("quoteSource").textContent = `—— ${quote.source}`;
}

const profileConfig = {
  gaokaoDate: "2027-06-07T00:00:00",
};

const weekdayMap = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

function updateTodayInfo() {
  const now = new Date();
  const fullDateText = `${now.getFullYear()} 年 ${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )} 月 ${String(now.getDate()).padStart(2, "0")} 日`;

  document.getElementById("calendarMonth").textContent = `${String(
    now.getMonth() + 1
  ).padStart(2, "0")} 月`;
  document.getElementById("calendarDay").textContent = String(now.getDate()).padStart(
    2,
    "0"
  );
  document.getElementById("todayFullDate").textContent = fullDateText;
  document.getElementById("todayWeekday").textContent = weekdayMap[now.getDay()];
}

function updateCountdown() {
  const targetDate = new Date(profileConfig.gaokaoDate);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const msDiff = targetDate.getTime() - today.getTime();
  const remainingDays = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

  const countdownDays = document.getElementById("countdownDays");
  const countdownStatus = document.getElementById("countdownStatus");

  if (remainingDays > 0) {
    countdownDays.textContent = String(remainingDays);
    countdownStatus.textContent = "每一天都在靠近目标。";
    return;
  }

  if (remainingDays === 0) {
    countdownDays.textContent = "0";
    countdownStatus.textContent = "今天就是高考首日，稳住节奏，全力发挥。";
    return;
  }

  countdownDays.textContent = "已到达";
  countdownStatus.textContent = "目标日期已过去，新的阶段也已经开始。";
}

function setupAvatarFallback() {
  const avatarFrame = document.getElementById("avatarFrame");
  const avatarImage = document.getElementById("avatarImage");

  avatarImage.addEventListener("error", () => {
    avatarFrame.classList.add("is-fallback");
  });

  if (!avatarImage.complete) {
    return;
  }

  if (avatarImage.naturalWidth === 0) {
    avatarFrame.classList.add("is-fallback");
  }
}

function createBackgroundRipple(x, y) {
  const waterSurface = document.getElementById("waterSurface");
  const ripple = document.createElement("span");

  ripple.className = "click-ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  waterSurface.appendChild(ripple);

  window.setTimeout(() => {
    ripple.remove();
  }, 2200);
}

function setupBackgroundRipple() {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".glass-card") || event.target.closest(".primary-button")) {
      return;
    }

    createBackgroundRipple(event.clientX, event.clientY);
  });
}

updateTodayInfo();
updateCountdown();
setupAvatarFallback();
setupBackgroundRipple();
pickDailyQuote();

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour >= 6 && hour < 12) {
    greeting = "早安";
  } else if (hour >= 12 && hour < 18) {
    greeting = "午安";
  } else {
    greeting = "晚安";
  }
  document.getElementById("greetingText").innerHTML = greeting + "喵~ <span>joki</span>";
}

updateGreeting();

document.getElementById("mdNoteCard").addEventListener("click", () => {
  window.location.href = "notes.html";
});

document.getElementById("projectCard").addEventListener("click", () => {
  window.open("https://github.com/joki233/local_word_translator", "_blank");
});
