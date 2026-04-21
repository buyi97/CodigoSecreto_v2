export type TimerCallback = (remaining: number) => void;

export class TimerManager {
  private timer: NodeJS.Timeout | null = null;
  private remainingSeconds: number = 0;
  private isPaused: boolean = false;
  private callbacks: TimerCallback[] = [];

  start(seconds: number): void {
    this.remainingSeconds = seconds;
    this.isPaused = false;
    this.tick();
  }

  pause(): void {
    this.isPaused = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resume(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this.tick();
    }
  }

  addSeconds(seconds: number): void {
    this.remainingSeconds += seconds;
    if (this.remainingSeconds < 0) this.remainingSeconds = 0;
  }

  reset(): void {
    this.pause();
    this.remainingSeconds = 0;
  }

  destroy(): void {
    this.reset();
    this.callbacks = [];
  }

  onTick(callback: TimerCallback): void {
    this.callbacks.push(callback);
  }

  private tick(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.remainingSeconds--;
        this.callbacks.forEach(cb => cb(this.remainingSeconds));
        if (this.remainingSeconds <= 0) {
          this.reset();
        }
      }
    }, 1000);
  }

  getRemaining(): number {
    return this.remainingSeconds;
  }
}