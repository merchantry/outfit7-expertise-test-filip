import { newProject } from '../projects';

describe('newProject', () => {
  it('should return a new project object', () => {
    const project = newProject();
    expect(project.id).toBe('new');
    expect(project.name).toBe('');
    expect(project.apiKey).toBe('');
    expect(project.updateIntervalSeconds).toBe('30');
  });
});
