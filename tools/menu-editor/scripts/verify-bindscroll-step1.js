// 浏览器内验证 bindScroll：分步执行，避免超长表达式
// 步骤 1
const st = window.editor.store.getState();
if (!st.project.pages.some((p) => p.name === '滚动页')) {
  window.editor.store.getState().update((p) => {
    p.pages.push({
      id: 'pg_ta', name: '滚动页', fnName: '', userCodePre: '',
      items: [
        { id: 'ta_bs', kind: 'textarea', label: '', bind: { type: 'none' },
          content: '第一行\n第二行\n第三行\n第四行\n第五行\n第六行\n第七行\n第八行',
          height: 40, bindScroll: true, lineSpacing: 0 },
      ],
    });
  });
}
'page added';
