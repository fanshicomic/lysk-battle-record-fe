import os
import re
import time
import hashlib
import json

project_root = "/Users/linfanshi/Documents/lysk-battle-record-fe"
hash_file = os.path.join(project_root, ".version_hash.json")
version = int(time.time())

def file_hash(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

# 1. 计算所有 js/css 文件 hash
current_hash = {}
for root, _, files in os.walk(project_root):
    for file in files:
        if file.endswith(".js") or file.endswith(".css"):
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, project_root)
            current_hash[rel_path] = file_hash(file_path)

# 2. 读取上次 hash
if os.path.exists(hash_file):
    with open(hash_file, "r") as f:
        last_hash = json.load(f)
else:
    last_hash = {}

# 3. 找出有变动的文件
changed_files = [k for k, v in current_hash.items() if last_hash.get(k) != v]
changed_basenames = set(os.path.basename(f) for f in changed_files)

# 4. 替换所有引用了这些文件的 version
link_pattern = re.compile(r'(<link[^>]+href=["\'])([^"\']+?)(\?v=\d+)?(["\'])')
script_pattern = re.compile(r'(<script[^>]+src=["\'])([^"\']+?)(\?v=\d+)?(["\'])')
import_pattern = re.compile(r'(import\s+.*?from\s+[\'"])([^\'"]+?)(\?v=\d+)?([\'"])')

def should_update(path):
    return any(path.endswith(name) for name in changed_basenames)

for root, _, files in os.walk(project_root):
    for file in files:
        if file.endswith(".html") or file.endswith(".js"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            original_content = content

            def sub_link(match):
                url = match.group(2)
                if should_update(url):
                    return f"{match.group(1)}{url}?v={version}{match.group(4)}"
                return match.group(0)

            def sub_script(match):
                url = match.group(2)
                if "googletagmanager.com/gtag/js" in url or not should_update(url):
                    return match.group(0)
                return f"{match.group(1)}{url}?v={version}{match.group(4)}"

            def sub_import(match):
                url = match.group(2)
                if should_update(url):
                    return f"{match.group(1)}{url}?v={version}{match.group(4)}"
                return match.group(0)

            if file.endswith(".html"):
                content = link_pattern.sub(sub_link, content)
                content = script_pattern.sub(sub_script, content)
                content = import_pattern.sub(sub_import, content)
            elif file.endswith(".js"):
                content = import_pattern.sub(sub_import, content)

            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated: {file_path}")

# 5. 保存本次 hash
with open(hash_file, "w") as f:
    json.dump(current_hash, f, indent=2)