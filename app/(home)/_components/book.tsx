"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import CSSMatrix from "@thednp/dommatrix";

type Vector3d = {
  x: number;
  y: number;
  z: number;
};

type AxisAngle = Vector3d & {
  angle: number;
};

// Computes the cross product of 2 vectors
const cross = (a: Vector3d, b: Vector3d) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});
const magnitude = (a: Vector3d) => Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

type Matrix =
  | DOMMatrixReadOnly
  | DOMMatrix
  | WebKitCSSMatrix
  | SVGMatrix
  | CSSMatrix;
const newMatrix = () => {
  if (typeof window === "undefined") {
    return new CSSMatrix();
  }
  if (window?.DOMMatrixReadOnly) return new DOMMatrixReadOnly();
  if (window?.DOMMatrix) return new DOMMatrix();
  if (window?.WebKitCSSMatrix) return new WebKitCSSMatrix();
  if (window?.SVGMatrix) return new SVGMatrix();
  return new CSSMatrix();
};

const BOOK_SIZE = 384;

export const Book = () => {
  const [matrix, setMatrix] = useState<Matrix>(newMatrix());
  const [momentum, setMomentum] = useState<AxisAngle>({
    angle: 45,
    x: 0.5,
    y: 1,
    z: 0,
  });
  const [friction, setFriction] = useState(0);
  const [held, setHeld] = useState(false);

  // tick physics
  const lastTick = useRef(Date.now());
  const tick = useCallback(() => {
    const now = Date.now();
    const deltaTime = now - lastTick.current;
    lastTick.current = now;
    if (momentum.angle > 0) {
      setMatrix(
        matrix.rotateAxisAngle(
          momentum.x,
          momentum.y,
          momentum.z,
          (momentum.angle * deltaTime) / 1000
        )
      );
      setMomentum({
        ...momentum,
        angle:
          Math.abs(momentum.angle) < 0.01 || held
            ? 0
            : momentum.angle -
              Math.sign(momentum.angle) *
                Math.min(
                  (friction * deltaTime) / 1000,
                  Math.abs(momentum.angle)
                ),
      });
    }
  }, [matrix, momentum, friction, held]);
  useEffect(() => {
    const interval = setInterval(tick, 1);
    return () => clearInterval(interval);
  }, [tick]);

  // tick mouse movement
  const lastMove = useRef<number>(null);
  const handleMoveDone = useCallback(() => {
    lastMove.current = null;
    setHeld(false);
  }, []);
  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.buttons === 1) {
      const now = Date.now();
      if (!lastMove.current) {
        lastMove.current = now;
        return;
      }
      const deltaTime = now - lastMove.current;
      lastMove.current = now;

      if (deltaTime === 0 || (event.movementX === 0 && event.movementY === 0)) {
        return;
      }

      const moveVector: Vector3d = {
        x: event.movementX,
        y: event.movementY,
        z: 0,
      };
      const velocity = (1000 * magnitude(moveVector)) / deltaTime;
      const anglularMomentum = (180 * velocity) / BOOK_SIZE;
      const rotationAxis = cross(moveVector, { x: 0, y: 0, z: -1 });
      setMomentum({ ...rotationAxis, angle: anglularMomentum });
      setHeld(true);
    }
  }, []);
  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setFriction(45);
  }, []);

  return (
    <div
      className={`perspective-distant flex-1 flex items-center justify-center ${
        held ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMoveDone}
      onMouseLeave={handleMoveDone}
      onMouseDown={handleMouseDown}
    >
      <div
        className="transform-3d aspect-book"
        style={{
          width: BOOK_SIZE,
          transform: `${matrix}`,
        }}
      >
        <div
          id="back-cover"
          className="w-full h-full -translate-z-8 absolute bg-gradient-to-bl from-amber-900 to-amber-950 overflow-clip"
        >
          <div className="absolute inset-0 noise-large" />
          <div className="absolute inset-0 drop-shadow-amber-900 drop-shadow">
            <div className="absolute top-1 right-1 bottom-1 -left-4 border-4 border-amber-400" />
            <div className="absolute w-8 -left-4 h-4 top-1/6 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-1/3 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-1/2 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-2/3 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-5/6 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
          </div>
        </div>
        <div
          id="spine"
          className="absolute -translate-z-8 origin-left -rotate-y-90 h-full w-16 bg-gradient-to-bl from-amber-900 to-amber-950 overflow-clip"
        >
          <div className="absolute inset-0 noise-large" />
          <div className="absolute inset-0 drop-shadow-amber-900 drop-shadow">
            <div className="absolute top-1 -right-4 bottom-1 -left-4 border-4 border-amber-400" />
            <div className="absolute w-full h-4 top-1/6 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400 ">
              <div className="absolute top-2 left-0 translate-x-1/2 -translate-y-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
              <div className="absolute top-2 left-1/2 -translate-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-full h-4 top-1/3 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400" />
            <div className="absolute w-full h-4 top-1/2 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 left-0 translate-x-1/2 -translate-y-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
              <div className="absolute top-2 left-1/2 -translate-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-full h-4 top-2/3 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400" />
            <div className="absolute w-full h-4 top-5/6 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 left-0 translate-x-1/2 -translate-y-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
              <div className="absolute top-2 left-1/2 -translate-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_75%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
          </div>
        </div>
        <div
          id="pages-right"
          className="absolute top-2 bottom-2 right-2 -translate-z-8 origin-right rotate-y-90 w-16 bg-gradient-to-br from-stone-200 to-stone-400"
        />
        <div
          id="pages-top"
          className="absolute top-2 left-0 right-2 -translate-z-8 origin-top rotate-x-90 h-16 bg-gradient-to-tr from-stone-200 to-stone-400"
        />
        <div
          id="pages-bottom"
          className="absolute bottom-2 left-0 right-2 -translate-z-8 origin-bottom -rotate-x-90 h-16 bg-gradient-to-bl from-stone-200 to-stone-400"
        />
        <div
          id="page-sticking-out-1"
          className="absolute top-4 left-1/4 right-0 bottom-0 -translate-z-2 rotate-z-3 bg-gradient-to-br from-stone-200 to-stone-400"
        />
        <div
          id="page-sticking-out-2"
          className="absolute top-4 left-1/4 right-0 bottom-2 -translate-z-2 rotate-z-1 bg-gradient-to-br from-stone-200 to-stone-400"
        />
        <div
          id="page-sticking-out-3"
          className="absolute top-2 left-1/4 right-0 bottom-4 translate-z-2 -rotate-z-1 bg-gradient-to-br from-stone-200 to-stone-400"
        />
        <div
          id="page-sticking-out-4"
          className="absolute top-0 left-1/4 right-0 bottom-4 translate-z-2 -rotate-z-3 bg-gradient-to-br from-stone-200 to-stone-400"
        />
        <div
          id="cover"
          className="w-full h-full translate-z-8 absolute bg-gradient-to-br from-amber-900 to-amber-950 overflow-clip"
        >
          <div className="absolute inset-0 noise-large" />
          <div className="absolute inset-0 drop-shadow-amber-900 drop-shadow">
            <div className="absolute top-1 right-1 bottom-1 -left-4 border-4 border-amber-400" />
            <div className="absolute w-8 -left-4 h-4 top-1/6 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-1/3 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-1/2 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-2/3 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute w-8 -left-4 h-4 top-5/6 rounded-full -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400">
              <div className="absolute top-2 right-0 -translate-1/2 bg-radial-[at_25%_25%] rounded-full size-2 from-yellow-600 via-yellow-800 to-yellow-900" />
            </div>
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <header>
                <p className="font-byline mb-1 text-amber-400">
                  Violet&rsquo;s
                </p>
                <h1 className="font-headline text-4xl text-amber-400">
                  Grotto
                  <br />
                  Bestiary
                </h1>
              </header>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 size-10">
                <div className="absolute outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*16)] -translate-y-1/2 bg-radial-[at_25%_25%] from-green-500 via-25% to-green-600 via-green-800 rounded-full size-10 border-green-700 border-2" />
                <div className="absolute pt-16 origin-top w-10">
                  <div className="bg-radial-[at_25%_25%] outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*5)] from-eternity-100 via-25% to-eternity-200 via-eternity-400 rounded-full size-10 border-eternity-300 border-2" />
                </div>
                <div className="absolute pt-16 origin-top w-10 rotate-[120deg]">
                  <div className="bg-radial-[at_25%_25%] outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*5)] from-blue-500 via-25% to-blue-600 via-blue-800 rounded-full size-10 -rotate-[120deg] border-blue-700 border-2" />
                </div>
                <div className="absolute pt-16 origin-top w-10 -rotate-[120deg]">
                  <div className="bg-radial-[at_25%_25%] outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*5)] from-red-400 via-25% to-red-500 via-red-700 rounded-full size-10 rotate-[120deg] border-red-600 border-2" />
                </div>
              </div>
              <div>
                <p className="font-byline text-lg mb-1 text-amber-400">
                  Vol. 1
                </p>
                <p className="font-byline mb-1 text-amber-400">
                  Documenting the Grottos, Beasts, Champions, and Wishes of the
                  world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
