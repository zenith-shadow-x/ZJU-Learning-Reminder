# 学在浙大签到提醒插件

一个用于监控「学在浙大」网站签到活动的浏览器扩展插件，支持系统通知和 Server酱 推送提醒。

---

## 功能特性

- ✅ **实时监控**：使用 MutationObserver 监听 DOM 变化
- ✅ **关键词检测**：自动识别「数字签到」「雷达签到」「请输入4位数字」等签到关键词
- ✅ **系统通知**：检测到签到时弹出浏览器系统通知
- ✅ **页面提醒**：页面背景变红并显示「我知道了」按钮
- ✅ **Server酱推送**：支持通过 Server酱 将提醒推送到手机
- ✅ **本地测试**：提供测试页面方便功能验证

---

## 安装指南

### Chrome / Edge 浏览器

1. 下载或克隆本项目
2. 打开浏览器扩展管理页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. 开启「开发者模式」
4. 点击「加载已解压的扩展程序」，选择项目目录
5. （可选）如需本地测试，在插件详情页勾选「允许访问文件 URL」

---

## 使用说明

### 配置 Server酱（可选）

#### 网页获取方式

1. 访问 [Server酱](https://sct.ftqq.com/) 获取 SendKey
2. 点击浏览器右上角插件图标
3. 在弹窗中输入 SendKey 并保存
4. 当检测到签到时，会自动推送通知到您的手机

#### 微信获取方式

1. 打开微信，搜索并关注「方糖」公众号
2. 点击公众号菜单「登入并获得 SendKey」
3. 在浏览器中打开插件设置，粘贴 SendKey 并保存

### 触发条件

当页面出现以下内容时，插件会自动触发提醒：
- 包含「数字签到」字样的元素
- 包含「雷达签到」字样的元素  
- 包含「请输入4位数字」占位符的输入框

---

## 测试

项目包含 `test.html` 测试页面，可用于验证插件功能：

1. 打开扩展管理页面，勾选「允许访问文件 URL」
2. 打开 `test.html` 文件
3. 点击页面上的测试按钮模拟签到场景

---

## 文件结构

```
├── manifest.json          # 扩展配置文件
├── content.js             # 内容脚本，监控 DOM 变化
├── background.js          # 后台脚本，处理通知和推送
├── popup.html             # 设置弹窗页面
├── popup.js               # 弹窗脚本
├── icon.png               # 插件图标
├── test.html              # 本地测试页面
├── README.md              # 项目说明文档
└── LICENSE                # 许可证文件
```

---

## 技术栈

- Manifest V3
- JavaScript (ES6+)
- MutationObserver API
- Chrome Extension API

---

## 局限性

### 运行环境要求

- **电脑不能进入休眠状态**：由于插件依赖浏览器运行，当电脑进入睡眠或休眠模式时，浏览器会暂停运行，插件将无法检测签到活动。

### 建议设置

为确保插件正常工作，请在系统设置中进行以下配置：

1. **Windows**：
   - 打开「设置」→「系统」→「电源和睡眠」
   - 将「电脑睡眠」设置为「从不」

2. **macOS**：
   - 打开「系统设置」→「电池」→「电源适配器」
   - 取消勾选「如果可能，让硬盘进入睡眠」
   - 取消勾选「启用电能小憩」

3. **Linux**：
   - 在电源管理设置中禁用自动睡眠

---

## 免责声明

⚠️ **免责声明**

### 学术性质声明

本插件是一个**纯学术研究工具**，旨在帮助学生提高学习效率和签到准时性。本工具的开发遵循以下原则：

1. **非侵入性设计**：插件仅监听页面内容变化，不修改任何网页数据，不干扰正常教学活动
2. **无自动化操作**：本插件**不提供任何自动签到功能**，所有签到操作仍需用户手动完成
3. **隐私保护**：用户配置的 Server酱 SendKey 仅存储在本地浏览器中，不会上传到任何服务器

### 使用条款

使用本插件即表示您同意：

1. 本插件仅用于提醒签到，不提供自动签到功能
2. 用户需自行负责及时签到，作者不承担任何因未及时签到导致的后果
3. 本插件与浙江大学官方无任何关联
4. 使用本插件需遵守浙江大学相关规定
5. 本插件仅供学习和研究目的使用，不得用于任何商业用途

---

## License

MIT License

---

---

# ZJU Learning Sign-in Reminder

A browser extension that monitors sign-in activities on the "Learning at ZJU" website, with system notifications and ServerChan push support.

---

## Features

- ✅ **Real-time Monitoring**: Uses MutationObserver to watch for DOM changes
- ✅ **Keyword Detection**: Automatically detects sign-in keywords like "数字签到", "雷达签到", "请输入4位数字"
- ✅ **System Notifications**: Pops up browser notifications when sign-in is detected
- ✅ **Page Alert**: Turns page background red with a dismiss button
- ✅ **ServerChan Push**: Supports push notifications to mobile via ServerChan
- ✅ **Local Testing**: Includes test page for functionality verification

---

## Installation

### Chrome / Edge

1. Download or clone this project
2. Open browser extension management:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project directory
5. (Optional) For local testing, check "Allow access to file URLs" in extension details

---

## Usage

### Configure ServerChan (Optional)

1. Get your SendKey from [ServerChan](https://sct.ftqq.com/)
2. Click the extension icon in browser toolbar
3. Enter your SendKey and save
4. Notifications will be pushed to your mobile when sign-in is detected

### Trigger Conditions

The extension will trigger alerts when:
- Elements containing "数字签到" (digital sign-in)
- Elements containing "雷达签到" (radar sign-in)
- Input fields with placeholder "请输入4位数字" (enter 4-digit number)

---

## Testing

The project includes `test.html` for testing:

1. Enable "Allow access to file URLs" in extension settings
2. Open `test.html` in browser
3. Click test buttons to simulate sign-in scenarios

---

## File Structure

```
├── manifest.json          # Extension configuration
├── content.js             # Content script for DOM monitoring
├── background.js          # Background script for notifications
├── popup.html             # Settings popup UI
├── popup.js               # Popup logic
├── icon.png               # Extension icon
├── test.html              # Local test page
├── README.md              # Documentation
└── LICENSE                # License file
```

---

## Tech Stack

- Manifest V3
- JavaScript (ES6+)
- MutationObserver API
- Chrome Extension API

---

## Limitations

### Runtime Requirements

- **Computer must stay awake**: Since this extension relies on the browser running, when the computer enters sleep or hibernation mode, the browser pauses and the extension will be unable to detect sign-in activities.

### Recommended Settings

To ensure proper functionality, please configure your system settings:

1. **Windows**:
   - Open "Settings" → "System" → "Power & sleep"
   - Set "Sleep" to "Never"

2. **macOS**:
   - Open "System Settings" → "Battery" → "Power Adapter"
   - Uncheck "Put hard disks to sleep when possible"
   - Uncheck "Enable Power Nap"

3. **Linux**:
   - Disable automatic sleep in power management settings

---

## Disclaimer

⚠️ **DISCLAIMER**

### Academic Research Tool Statement

This extension is a **pure academic research tool** designed to help students improve learning efficiency and sign-in punctuality. Development of this tool follows these principles:

1. **Non-intrusive design**: The extension only monitors page content changes, does not modify any webpage data, and does not interfere with normal teaching activities
2. **No automation**: This extension **does not provide any auto-sign-in functionality**. All sign-in operations must be completed manually by the user
3. **Privacy protection**: User-configured ServerChan SendKeys are stored only locally in the browser and are never uploaded to any server

### Terms of Use

By using this extension, you agree that:

1. This extension only provides reminders and does not automate sign-in
2. Users are responsible for timely sign-in. The author is not liable for any consequences
3. This extension is not affiliated with Zhejiang University
4. Usage must comply with Zhejiang University regulations
5. This extension is for educational and research purposes only, not for commercial use

---

## License

MIT License