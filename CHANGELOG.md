## 2.0.0

fock[原仓库](https://github.com/fex-team/kityminder-core)，大量修改，版本号直接从 2.0.0 开始

#### ⚠ _notice_: big change, read bofore update

- add
  - execCommand: wait async command to end
  - KeyReceiver: support event cut now
  - node: support event DropOnNode
  - exportData: png supports option.scale, used for ctx.scale
  - addShortcut: function with property {notPreventDefault:true} won't call preventDefault on event
  - addCommandShortcutKeys: third parameter notPreventDefault, the same as above
  - expand : new defaultOption {expandPos:'in'} or 'out', switch expandIcon's position
  - resource: getAllNodeResource on Minder, return all resource used in all nodes
  - extra: getAllNodeExtra on Minder, return all extra used in all nodes, by the way, it's also a new property on MinderNode and JSON data and so on...
  - text: new defaultOption {whiteSpace:undefined}, used for text render [css white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  - background: resetBackground on MinderNode
  - camera: new defaultOption {alignByText:'center'} or 'left', 'right', used for camera on node

- update
  - Minder: version 2.0.0
  - importJson: fire afterimport instead of import now
  - exportData: may fails now, remeber to catch when exporting png (also bug fix)
  - KeyReceiver: don't preventDefault by default, do it yourself when keydown and so on...
  - image: command return promise now
  - keymap: read commit's diff
  - text: if text is empty, it's empty rather than a space

- fix
  - focus&blur: fire only once now
  - wire mode: marker resource is loaded correctly

- build
  - @babel/preset-env
