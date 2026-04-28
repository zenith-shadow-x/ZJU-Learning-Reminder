// popup.js - 弹窗脚本，处理 PushKey 的保存和读取

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    console.log('[Popup] 弹窗脚本已加载');

    // 获取页面元素
    const pushKeyInput = document.getElementById('pushKeyInput');
    const saveBtn = document.getElementById('saveBtn');
    const statusEl = document.getElementById('status');

    // 检查元素是否存在
    if (!pushKeyInput || !saveBtn) {
        console.error('[Popup] 必要的页面元素未找到');
        return;
    }

    // 页面加载时读取已保存的 PushKey
    chrome.storage.local.get(['pushKey'], (result) => {
        console.log('[Popup] 读取存储结果:', result);
        if (result.pushKey) {
            pushKeyInput.value = result.pushKey;
            console.log('[Popup] 已填入保存的 PushKey');
        }
    });

    // 保存按钮点击事件
    saveBtn.addEventListener('click', () => {
        const pushKey = pushKeyInput.value.trim();

        console.log('[Popup] 点击了保存按钮');

        // 验证输入
        if (!pushKey) {
            statusEl.textContent = '请输入 PushKey';
            statusEl.className = 'status error';
            return;
        }

        // 显示保存中状态
        saveBtn.textContent = '保存中...';
        saveBtn.disabled = true;

        // 保存到 chrome.storage.local
        chrome.storage.local.set({ pushKey: pushKey }, () => {
            console.log('[Popup] 存储操作完成, lastError:', chrome.runtime.lastError);

            // 恢复按钮状态
            saveBtn.textContent = '保存成功！';
            saveBtn.disabled = false;

            // 2秒后恢复按钮文字
            setTimeout(() => {
                saveBtn.textContent = '保存 PushKey';
            }, 2000);

            // 显示成功状态
            statusEl.textContent = '已保存到本地！';
            statusEl.className = 'status success';
        });
    });

    // 输入框回车事件
    pushKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });
});