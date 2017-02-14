import { SVG_NS, KEYS } from '../settings';

import Board from './Board';
import Ball from './Ball';
import Score from './Score';
import Paddle from './Paddle';


export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.radius = 8;

		this.gameElement = document.getElementById(this.element);
		this.pause = false;

		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.w,
			KEYS.s,
			KEYS.a,
			KEYS.d
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			KEYS.left,
			KEYS.right
		);

		this.score1 = new Score(272, 40, 40);
		this.score2 = new Score(212, 40, 40);

		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});

		this.ball = new Ball(this.radius, this.width, this.height);

		this.ball1 = new Ball();

		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
				case KEYS.g:
					this.ball1 = new Ball(20, this.width, this.height);
					break;
				case KEYS.h:
					this.ball1 = new Ball();
					break;
			}
		});

	}

	render() {

		if (this.pause) {
			return;
		}
		//empties out the SVGs so page doesn't scroll infinitely
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.ball1.render(svg, this.player1, this.player2);

		this.player1.render(svg);
		this.player2.render(svg);

		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);

	}

}