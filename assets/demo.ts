import {
  _decorator,
  Component,
  Node,
  TiledMap,
  UITransform,
  Vec3,
  Prefab,
  instantiate,
  Label,
  input,
  Input,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("demo")
export class demo extends Component {
  @property({ type: Node })
  mapNode: Node = null;
  @property({ type: Node })
  AntButton_Top: Node = null;
  @property({ type: Node })
  AntButton_Bottom: Node = null;
  @property({ type: Prefab })
  button: Prefab = null;
  @property({ type: Prefab })
  Ant_buttonPrefab: Prefab = null;
  buttonHeight: number;
  start() {
    this.buttonAdder();
    var n = this.mapNode.getComponent(TiledMap).getObjectGroups().length;
    console.log(n);
    for (var i = 1; i < n; i++) {
      let pathObj = this.mapNode.getComponent(TiledMap).getObjectGroup(`PathObj${i}`);
      var button_Obj = pathObj.getObject(`Button${i}A`);
      var button2_Obj = pathObj.getObject(`Button${i}B`);

      let worlPosOfBtn1 = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button_Obj.x - pathObj.node.getContentSize().width * 0.5,
            button_Obj.y - pathObj.node.getContentSize().height * 0.5,
            0
          )
        );

      let worlPosOfBtn2 = pathObj.node
        .getComponent(UITransform)
        .convertToWorldSpaceAR(
          new Vec3(
            button2_Obj.x - pathObj.node.getContentSize().width * 0.5,
            button2_Obj.y - pathObj.node.getContentSize().height * 0.5,
            0
          )
        );

      var pos_oneA = this.node
        .getComponent(UITransform)
        .convertToNodeSpaceAR(new Vec3(worlPosOfBtn1.x, worlPosOfBtn1.y));
      var pos1_oneA = this.node
        .getComponent(UITransform)
        .convertToNodeSpaceAR(new Vec3(worlPosOfBtn2.x, worlPosOfBtn2.y));

      console.log({ name: `Button${i}A`, button_Obj, worlPosOfBtn1, pos_oneA, NODE: pathObj.node });
      console.log({ name: `Button${i}B`, button2_Obj, worlPosOfBtn2, pos1_oneA });

      var buttonclick1 = instantiate(this.button);
      buttonclick1.setPosition(pos_oneA.x, pos_oneA.y, 0);
      buttonclick1.getChildByName("Label").getComponent(Label).string = `Button${i}A`;
      this.node.addChild(buttonclick1);
      var buttonclick2 = instantiate(this.button);
      buttonclick2.setPosition(pos1_oneA.x, pos1_oneA.y, 0);
      buttonclick2.getChildByName("Label").getComponent(Label).string = `Button${i}B`;
      this.node.addChild(buttonclick2);
    }
  }
  buttonAdder() {
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.Ant_buttonPrefab);
      this.buttonHeight = newButton.getComponent(UITransform).height;
      this.AntButton_Bottom.addChild(newButton);
      //   this.AntButton_Bottom.children[i]
      // .getComponent(antTypeButton)
      // .addSprites(newButton, i, PLAYER.PLAYER1);
    }
    // this.buttonHeight = newButton.getComponent(UITransform).getBoundingBox().y;
    for (var i = 0; i < 6; i++) {
      var newButton = instantiate(this.Ant_buttonPrefab);

      newButton.angle = 180;

      this.AntButton_Top.addChild(newButton);
      //   this.AntButton_Top.children[i]
      //     .getComponent(antTypeButton)
      //     .addSprites(newButton, i, PLAYER.PLAYER2);
    }
  }
  update(deltaTime: number) {}
}
