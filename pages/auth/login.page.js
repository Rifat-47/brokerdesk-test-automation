/** The same form signs people in to a workspace and operators in to the admin. */
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.submit = page.getByRole('button', { name: 'Sign in', exact: true });
  }

  heading(name) {
    return this.page.getByRole('heading', { level: 1, name });
  }

  async open() {
    await this.page.goto('/login');
  }
}
