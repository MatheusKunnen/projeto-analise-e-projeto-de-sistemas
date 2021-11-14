import express from 'express';
import UsuarioRouter from './UsuarioRouter';

export default abstract class Router {
  app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  abstract initRouter(): void;
}
