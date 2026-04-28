// 学在浙大签到提醒插件
// 使用 MutationObserver 监听 DOM 变化

// 移动端推送开关 - 已启用（推送逻辑已移至 background.js）
const enableMobilePush = true;

// 初始化函数
function init() {
  // 健壮性检查：确保页面有 body 元素
  if (!document.body) {
    console.log('[ContentScript] 页面 body 元素尚未加载，延迟初始化');
    setTimeout(init, 100);
    return;
  }
  // 检查是否有权限发送通知
  if ('Notification' in window) {
    // 请求通知权限
    Notification.requestPermission();
  }
  
  // 创建 MutationObserver 实例
  const observer = new MutationObserver((mutations) => {
    // 遍历所有 DOM 变化
    mutations.forEach((mutation) => {
      // 检查新增的节点
      mutation.addedNodes.forEach((node) => {
        // 只处理元素节点
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 检查节点及其子节点是否包含签到相关内容
          checkForSignIn(node);
        }
      });
    });
  });
  
  // 配置观察选项
  const observerOptions = {
    childList: true,  // 观察子节点变化
    subtree: true,    // 观察整个子树
    characterData: true  // 观察文本内容变化
  };
  
  // 开始观察整个文档
  observer.observe(document.body, observerOptions);
  
  console.log('学在浙大签到提醒插件已初始化');
}

// 检查是否存在签到相关内容
function checkForSignIn(element) {
  // 检查条件1：包含'数字签到'或'雷达签到'字样的元素
  const hasSignInText = element.textContent && (
    element.textContent.includes('数字签到') || 
    element.textContent.includes('雷达签到')
  );
  
  // 检查条件2：包含'请输入4位数字'字样的输入框
  const hasNumberInput = element.tagName === 'INPUT' && 
    element.placeholder && 
    element.placeholder.includes('请输入4位数字');
  
  // 检查子元素中是否有符合条件的输入框
  const childInputs = element.querySelectorAll('input');
  let childHasNumberInput = false;
  childInputs.forEach(input => {
    if (input.placeholder && input.placeholder.includes('请输入4位数字')) {
      childHasNumberInput = true;
    }
  });
  
  // 如果满足任何一个条件，触发提醒
  if (hasSignInText || hasNumberInput || childHasNumberInput) {
    triggerReminder();
  }
}

// 触发提醒
function triggerReminder() {
  // 1. 在控制台打印日志，便于调试
  console.log('[ContentScript] 准备发送消息给后台...');
  
  // 2. 发送消息给 background.js（系统通知 + 移动端推送均由后台处理）
  chrome.runtime.sendMessage({ type: 'SIGN_IN_DETECTED' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('[ContentScript] 发送消息失败:', chrome.runtime.lastError.message);
    } else if (response) {
      console.log('[ContentScript] 后台响应:', response);
      
      if (response.success) {
        console.log('[ContentScript] 系统通知已创建');
        
        // 显示移动端推送结果
        if (response.pushResult) {
          if (response.pushResult.success) {
            console.log('[ContentScript] 移动端推送成功');
          } else {
            console.log('[ContentScript] 移动端推送失败:', response.pushResult.error);
          }
        }
      } else {
        console.error('[ContentScript] 后台处理失败:', response.error);
      }
    } else {
      console.log('[ContentScript] 消息已发送，但未收到响应');
    }
  });
  
  // 3. 网页背景变红
  document.body.style.backgroundColor = 'red';
  
  // 4. 创建停止变红按钮
  createStopButton();
  
  console.log('[ContentScript] 签到提醒已触发');
}

// 创建停止变红按钮
function createStopButton() {
  // 检查是否已经存在按钮
  const existingButton = document.getElementById('stop-reminder-button');
  if (existingButton) {
    return;
  }
  
  // 创建按钮元素
  const button = document.createElement('button');
  button.id = 'stop-reminder-button';
  button.textContent = '我知道了，关闭提醒';
  
  // 设置按钮样式
  button.style.position = 'fixed';
  button.style.top = '20px';
  button.style.right = '20px';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = 'white';
  button.style.color = 'black';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.fontSize = '14px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '9999';
  button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  
  // 添加点击事件
  button.addEventListener('click', () => {
    // 恢复背景颜色
    document.body.style.backgroundColor = '';
    // 移除按钮
    button.remove();
  });
  
  // 添加到页面
  document.body.appendChild(button);
}

// 直接执行初始化函数，不再等待页面加载完成
init();