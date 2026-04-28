// background.js - Service Worker 用于处理系统通知和移动端推送
// 使用 Base64 编码的透明像素作为默认图标，确保通知能正常弹出

// 1x1 透明像素的 Base64 编码 - 用于确保通知图标有效
const DEFAULT_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Server酱 API 基础地址
const SERVER_CHAN_API = 'https://sctapi.ftqq.com';

// 发送 Server酱 推送
async function sendServerChanNotification(pushKey) {
    console.log('[Background] 正在发送 Server酱 推送，SendKey为:', pushKey);
    
    if (!pushKey) {
        console.log('[Background] SendKey 为空，跳过推送');
        return { success: false, error: 'SendKey 未配置' };
    }
    
    try {
        // 构建请求 URL（Server酱 使用 GET 请求）
        const url = `${SERVER_CHAN_API}/${pushKey}.send?title=${encodeURIComponent('发现签到')}&desp=${encodeURIComponent('检测到签到关键词。')}`;
        console.log('[Background] 请求URL:', url);
        
        // 发送 GET 请求（Server酱 推荐使用 GET）
        const response = await fetch(url);
        const data = await response.json();
        
        // 打印服务器返回信息
        console.log('[Background] Server酱 返回 code:', data.code, 'message:', data.message);
        
        if (data.code === 0) {
            console.log('[Background] Server酱 推送成功:', data);
            return { success: true, data: data };
        } else {
            console.error('[Background] Server酱 推送失败:', data.message);
            return { success: false, error: data.message || '未知错误' };
        }
    } catch (error) {
        // 判断错误类型
        let errorType = '未知错误';
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            errorType = '网络请求失败（可能是 CORS 或网络问题）';
        } else if (error.name === 'AbortError') {
            errorType = '请求被中止';
        } else if (error.name === 'TimeoutError') {
            errorType = '请求超时';
        }
        
        console.error('[Background] Server酱 推送失败 - 错误类型:', errorType, '详情:', error.message);
        return { success: false, error: errorType };
    }
}

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 检查是否是签到检测消息
    if (message.type === 'SIGN_IN_DETECTED') {
        console.log('[Background] 收到签到检测消息');
        
        // 创建系统通知
        chrome.notifications.create({
            type: 'basic',
            title: '发现签到',
            message: '检测到签到关键词，请及时处理',
            iconUrl: DEFAULT_ICON,
            priority: 2
        }, (notificationId) => {
            if (chrome.runtime.lastError) {
                console.error('[Background] 创建系统通知失败:', chrome.runtime.lastError.message);
            } else {
                console.log('[Background] 系统通知创建成功，ID:', notificationId);
            }
        });
        
        // 读取 SendKey 并发送推送
        chrome.storage.local.get(['pushKey'], async (result) => {
            const pushKey = result.pushKey;
            const pushResult = await sendServerChanNotification(pushKey);
            
            // 发送响应给 content script
            sendResponse({
                success: true,
                notificationCreated: true,
                pushResult: pushResult
            });
        });
        
        // 必须返回 true 以支持异步 sendResponse
        return true;
    }
});

console.log('[Background] Service Worker 已初始化');