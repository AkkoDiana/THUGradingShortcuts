// ==UserScript==
// @name         批卷系统快捷键助手
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description 为学校批卷系统添加快捷键支持，提高批改效率
// @author       你的名字
// @match        https://learn.tsinghua.edu.cn/f/wlxt/kczy/xszy/teacher/fx/*
// @match        https://learn.tsinghua.edu.cn/f/wlxt/kczy/xszy/teacher/beforePiYue*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    // 配置快捷键映射
    const keyMap = {
        's': '#btn-save',          // s键 -> 保存
        'Enter': '#btn-save'     // 回车 -> 提交
    };
    // 判断当前页面类型
    if (/\/teacher\/fx\//.test(currentUrl)) {
        initFxPage();
    } 
    else if (/\/teacher\/beforePiYue\?/.test(currentUrl)) {
        initBeforePiYuePage();
    }

    // 等待主容器加载完成
    function initFxPage() {
        const container = document.querySelector('#pdf-ui');
        if (container) {
            setupShortcuts();
            showHelpTooltip();
        } else {
            setTimeout(initFxPage, 500);
        }
    }

    function initBeforePiYuePage() {
        const container = document.querySelector('.container');
        if (container) {
            setupShortcuts();
            showHelpTooltip();
        } else {
            setTimeout(initBeforePiYuePage, 500);
        }
    }

    // 设置快捷键
    function setupShortcuts() {
        document.addEventListener('keydown', function(event) {
            const selector = keyMap[event.key];
            if (selector) {
                const btn = document.querySelector(selector);
                if (btn) {
                    event.preventDefault();
                    btn.click();
                    // 添加点击反馈效果
                    showClickFeedback(btn);
                }
            }
        });
    }

    // 显示点击反馈
    function showClickFeedback(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }

    // 显示帮助提示
    function showHelpTooltip() {
        const helpDiv = document.createElement('div');
        helpDiv.style.position = 'fixed';
        helpDiv.style.bottom = '20px';
        helpDiv.style.right = '20px';
        helpDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
        helpDiv.style.color = 'white';
        helpDiv.style.padding = '10px';
        helpDiv.style.borderRadius = '5px';
        helpDiv.style.zIndex = '9999';
        helpDiv.innerHTML = `
            <h3>快捷键帮助</h3>
            <p>1: 正确</p>
            <p>2: 部分正确</p>
            <p>3: 错误</p>
            <p>←/→: 上一题/下一题</p>
            <p>S: 保存</p>
            <p>Enter: 提交</p>
        `;
        document.body.appendChild(helpDiv);
    }

})();