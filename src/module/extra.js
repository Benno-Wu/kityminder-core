define(function (require, exports, module) {
    var kity = require('../core/kity');
    var utils = require('../core/utils');

    var Minder = require('../core/minder');
    var MinderNode = require('../core/node');
    var Command = require('../core/command');
    var Module = require('../core/module');
    var Renderer = require('../core/render');

    Module.register('Extra', function () {
        // copyright https://ant.design/
        const iconPath = 'M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s0.9 4.7 2.6 6.4l36.9 36.9c3.5 3.5 9.2 3.5 12.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h0.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s0.9 4.7 2.6 6.4l36.9 36.9c3.5 3.5 9.2 3.5 12.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1C192 634.9 174 678.4 174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c0.1-64.6-25.1-125.3-70.7-170.9z'

        kity.extendClass(Minder, {
            getAllNodeExtra: () => {
                const extras = {}
                this.getAllNode().forEach(v => {
                    const extra = v.getData('extra')
                    if (Array.isArray(extra)) {
                        extra.forEach(v => {
                            if (!extras.hasOwnProperty(v)) {
                                extras[v] = null
                            }
                        })
                    }
                })
                return Array.from(Object.keys(extras))
            },
        });

        var extra = kity.createClass('ExtraCommand', {
            base: Command,
            execute: function (minder, extras, nodes = minder.getSelectedNodes()) {
                if (typeof extras == 'string') {
                    extras = [extras];
                }
                if (!Array.isArray(nodes)) {
                    nodes = [nodes]
                }
                nodes.forEach(function (node) {
                    node.setData('extra', extras).render();
                });
                minder.layout(200);
            },
            queryValue: function (minder, nodes = minder.getSelectedNodes()) {
                if (!Array.isArray(nodes)) {
                    nodes = [nodes]
                }
                var extra = [];
                nodes.forEach(function (node) {
                    var nodeExtra = node.getData('extra');
                    if (!nodeExtra) return;
                    nodeExtra.forEach(function (name) {
                        if (!~extra.indexOf(name)) {
                            extra.push(name);
                        }
                    });
                });
                return extra;
            },
            queryState: function (km) { return 0 }
        });

        const num = 18
        const ExtraIcon = kity.createClass('ExtraIcon', {
            base: kity.Group,
            constructor: function () {
                this.callBase();
                this.width = this.height = num;
                this.rect = new kity.Rect(0, num + 1, 0, 0, 5).fill('transparent');
                this.path = new kity.Path().setPathData(iconPath).setScale(0.018)
                this.text = new kity.Text()
                    .setX(this.width).setY(this.height / 2)
                    .setVerticalAlign('middle')
                    .setFontSize(12)
                this.addShapes([this.rect, this.path, this.text]);
                this.translate(0, num / 2)

                this.on('mouseover', function () {
                    this.rect.fill('rgba(255, 255, 200, .8)');
                }).on('mouseout', function () {
                    this.rect.fill('transparent');
                })
                this.setStyle('cursor', 'pointer')
                this.setId(utils.uuid('node_extra'));
            },
        });
        const bottom = kity.createClass('ExtraRenderer', {
            base: Renderer,
            create: function (node) {
                this.list = [];
                return new kity.Group();
            },
            shouldRender: function (node) {
                return node.getData('extra')?.length
            },
            update: function (container, node, box) {
                const space = node.getStyle('space-bottom')
                const color = node.getStyle('color')
                const extras = node.getData('extra')
                if (!extras.length) return;
                this.list.forEach(_ => _.setVisible(false))
                const allWidth = []
                extras.forEach((v, i) => {
                    let icon = this.list[i]
                    if (!icon) {
                        icon = new ExtraIcon()
                        this.list.push(icon)
                        container.addShape(icon)
                    }
                    icon.setVisible(true)
                    icon.text.setContent(v).setX(num + space / 2).fill(color)
                    icon.path.fill(color)
                    icon.rect.setWidth(icon.text.getBoundaryBox().width + space + num)
                    icon.setTranslate(box.cx - icon.getWidth() / 2, i * icon.height + space / 2)
                    allWidth.push(icon.getWidth())
                })

                const maxWidth = Math.max(...allWidth)
                return new kity.Box({
                    x: box.left - (maxWidth - box.width) / 2,
                    y: box.height + box.y,
                    width: maxWidth,
                    height: (num + 1) * node.getData('extra').length,
                });
            }
        });

        return {
            commands: { extra },
            renderers: { bottom },
        };
    });
});