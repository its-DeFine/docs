#!/usr/bin/env python3
"""Generate VS Code component snippets from component-registry.json"""
import json

with open('docs-guide/component-registry.json') as f:
    data = json.load(f)

snippets = {}
seen = set()

for c in data['components']:
    name = c['name']
    if name in seen:
        continue
    seen.add(name)

    status = c.get('status', '')
    if status == 'deprecated' or c.get('deprecated'):
        continue

    cat = c.get('category', 'unknown')
    params = c.get('params', [])
    req_params = [p for p in params if p.get('required')]
    desc = c.get('description', '')

    has_children = any(p['name'] == 'children' for p in params)

    tab_idx = 1
    attrs = []
    for p in req_params:
        if p['name'] == 'children':
            continue
        ptype = p.get('type', 'any')
        pname = p['name']
        if ptype == 'boolean':
            attrs.append(pname)
        elif 'number' in str(ptype) or pname == 'limit':
            attrs.append(pname + '={${' + str(tab_idx) + ':1}}')
        elif ptype == 'object' or str(p.get('defaultValue', '')).startswith('{'):
            attrs.append(pname + '={${' + str(tab_idx) + ':{}}}')
        else:
            attrs.append(pname + '="${' + str(tab_idx) + '}"')
        tab_idx += 1

    attr_str = (' ' + ' '.join(attrs)) if attrs else ''

    if has_children:
        body = [
            '<' + name + attr_str + '>',
            '  ${' + str(tab_idx) + ':content}',
            '</' + name + '>'
        ]
    else:
        body = ['<' + name + attr_str + ' />']

    lc = name[0].lower() + name[1:]
    snippets[cat + ': ' + name] = {
        'scope': 'mdx,markdown',
        'prefix': [lc, name],
        'body': body,
        'description': '[' + cat + '] ' + desc
    }

snippets = dict(sorted(snippets.items()))

with open('.vscode/components.code-snippets', 'w') as f:
    json.dump(snippets, f, indent=2)
    f.write('\n')

print('Generated', len(snippets), 'component snippets')
