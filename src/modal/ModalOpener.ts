import { ReactNode } from 'react';

type RenderChildrenFunction = (render: () => ReactNode) => void;
type Modal = { render: () => ReactNode };

export class ModalOpener {
  private static _instance: ModalOpener;
  private renderChildren?: RenderChildrenFunction;
  /**
   * We keep a stack of all modals that are shown (e.g. when modals in modals)
   * Closing a modal will remove (pop) the last element of the stack.
   */
  private currentModals: Modal[];

  private constructor() {
    this.currentModals = [];
  }

  public static initialize(_showChildren: RenderChildrenFunction) {
    ModalOpener.instance.renderChildren = _showChildren;
  }

  public static get instance(): ModalOpener {
    if (!ModalOpener._instance) {
      ModalOpener._instance = new ModalOpener();
    }
    return ModalOpener._instance;
  }

  public open(modal: Modal) {
    this.currentModals = [...this.currentModals, modal];
    this.renderChildren?.(modal.render);
  }

  public close() {
    if (!this.currentModals.length) return;
    this.currentModals = this.currentModals.slice(0, this.currentModals.length - 1);
    this.renderChildren?.(this.currentModals[this.currentModals.length - 1]?.render || (() => null));
  }

  public closeAll() {
    this.currentModals = [];
    this.renderChildren?.(() => null);
  }
}
