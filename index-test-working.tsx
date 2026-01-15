
import React from 'react';
import ReactDOM from 'react-dom/client';

// 简单的测试组件
const TestApp = () => {
    return (
        <div style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            minHeight: '100vh'
        }}>
            <h1 style={{ color: '#607AFB' }}>🎉 React 正常工作！</h1>
            <p>如果您看到这个页面，说明 React 已经成功加载。</p>
            <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2>✅ 配置检查</h2>
                <ul>
                    <li>✓ Vite 开发服务器运行中</li>
                    <li>✓ React 组件渲染成功</li>
                    <li>✓ JavaScript 执行正常</li>
                </ul>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={() => alert('按钮点击正常！')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#607AFB',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    测试按钮
                </button>
            </div>
        </div>
    );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error('❌ 找不到 root 元素！');
    document.body.innerHTML = '<h1 style="color: red; padding: 20px;">错误：找不到 root 元素</h1>';
} else {
    console.log('✓ 找到 root 元素，开始渲染...');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <TestApp />
        </React.StrictMode>
    );
    console.log('✓ React 应用已渲染');
}
