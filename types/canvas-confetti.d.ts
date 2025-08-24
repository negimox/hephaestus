declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number;
    startVelocity?: number;
    spread?: number;
    ticks?: number;
    zIndex?: number;
    origin?: { x: number; y: number };
    [key: string]: any;
  }

  function confetti(opts?: ConfettiOptions): void;

  export = confetti;
}
