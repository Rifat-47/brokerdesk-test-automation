/** The main menu of the workspace and of the operator admin. */
export class Sidebar {
  constructor(page) {
    this.nav = page.getByRole('navigation', { name: 'Main' });
  }

  link(name) {
    return this.nav.getByRole('link', { name, exact: true });
  }
}
