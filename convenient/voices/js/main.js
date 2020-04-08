// 第一步 初始化 speechsynthesis API
const synth = window.speechSynthesis;

// 第二步 获取DOM节点
const body = document.querySelector("body");
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

// 第三步 创建voices arry 并获得下拉框语音选项
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // console.log(voices);

  // 循环voices数组 并创建option节点插入语音
  voices.forEach(voice => {
    // 创建option标签
    const option = document.createElement("option");
    // 插入语音名称及语音编码
    option.textContent = voice.name + "(" + voice.lang + ")";
    // 设置option的属性
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// 第四步 speak
const speak = () => {
  // 验证是否在说话
  if (synth.speaking) {
    console.error("正在说话中...");
    return;
  }

  if (textInput.value !== "") {
    // 添加背景动画（gif）
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    body.style.backgroundPositionY = "-80px";
    // 获得说话文本
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // 说话结束触发
    speakText.onend = e => {
      console.log("说话结束");
      body.style.background = "#141414";
    };

    // 发生阻止说出话语的错误就触发
    speakText.onerror = e => {
      console.error("抱歉出错了");
    };

    // 选择下拉框中的语音
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // 遍历voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // 设置音速和音调
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synth.speak(speakText);
  }
};

// 事件监听

// form表单文本提交
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// 音速值的变化
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// 音调值的变化
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// 下拉框选项切换
voiceSelect.addEventListener("change", e => speak());

// https://www.jianshu.com/p/0fe532e959f9
