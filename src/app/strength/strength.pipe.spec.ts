import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    // Arrange
    const pipe = new StrengthPipe();
    // Act
    const val = pipe.transform(5);
    // Assert
    expect(val).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    // Arrange
    const pipe = new StrengthPipe();
    // Act
    const val = pipe.transform(10);
    // Assert
    expect(val).toEqual('10 (strong)');
  });

  it('should display unbelievable if strength is 20', () => {
    // Arrange
    const pipe = new StrengthPipe();
    // Act
    const val = pipe.transform(20);
    // Assert
    expect(val).toEqual('20 (unbelievable)');
  });
});
