import { SVG_NS } from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down, left, right) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;

        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case up:
                    this.up();
                    break;
                case down:
                    this.down();
                    break;
                case left:
                    this.left();
                    break;
                case right:
                    this.right();
                    break;
            }
        });
    }

    up() {
        this.y = Math.max(0, this.y - this.speed);
    }

    down() {
        this.y = Math.min((this.boardHeight - this.height), this.y + this.speed);
    }

    left() {
        this.x = Math.min(this.boardHeight*2, this.x - this.speed);
    }

    right() {
        this.x = Math.max(this.x + this.speed, 0)
    }
    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }

    render(svg) {
        let paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, 'fill', 'white');
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'x', this.x); //x of the top left corner
        paddle.setAttributeNS(null, 'y', this.y); // y of the top left corner

        svg.appendChild(paddle);

    }
}
