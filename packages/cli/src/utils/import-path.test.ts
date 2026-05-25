import { describe, it, expect } from "vitest";
import { computeCnImportPath } from "./import-path.js";

describe("computeCnImportPath", () => {
  it("should compute relative path when componentsDir is nested deeper than libDir", () => {
    const result = computeCnImportPath("src/components/ui", "src/lib");
    expect(result).toBe("../../lib/cn");
  });

  it("should compute relative path for common app router structure", () => {
    const result = computeCnImportPath("src/app/_components", "src/lib");
    expect(result).toBe("../../lib/cn");
  });

  it("should compute relative path when both dirs share the same parent", () => {
    const result = computeCnImportPath("src/ui", "src/lib");
    expect(result).toBe("../lib/cn");
  });

  it("should handle deeply nested componentsDir", () => {
    const result = computeCnImportPath(
      "src/features/auth/components",
      "src/lib",
    );
    expect(result).toBe("../../../lib/cn");
  });
});
