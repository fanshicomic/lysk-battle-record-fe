import os
import re
import time

# 设置你的项目根目录
project_root = "/Users/linfanshi/Documents/lysk-battle-record-fe"

# 使用当前时间作为版本号
version = int(time.time())

# 正则表达式
html_link_pattern = re.compile(r'(<link[^>]+href=["\'].*?)(\?v=\d+)?(["\'])')
html_script_pattern = re.compile(r'(<script[^>]+src=["\'].*?)(\?v=\d+)?(["\'])')
js_import_pattern = re.compile(r'(import\s+.*?from\s+[\'"])(.*?)(\?v=\d+)?([\'"])')

# 遍历并修改文件
for root, _, files in os.walk(project_root):
    for file in files:
        if file.endswith(".html") or file.endswith(".js"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            original_content = content

            if file.endswith(".html"):
                content = html_link_pattern.sub(rf'\1?v={version}\3', content)
                content = html_script_pattern.sub(rf'\1?v={version}\3', content)
                content = js_import_pattern.sub(rf'\1\2?v={version}\4', content)
            elif file.endswith(".js"):
                content = js_import_pattern.sub(rf'\1\2?v={version}\4', content)

            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated: {file_path}")
