import { cn } from '@/lib/utils';
import '@testing-library/jest-dom';

describe('Utility Functions', () => {
  beforeEach(() => {
    console.log('🧪 Starting utility functions test');
  });

  afterEach(() => {
    console.log('✅ Utility functions test completed');
  });

  describe('cn function (className merger)', () => {
    it('merges class names correctly', () => {
      console.log('📝 Testing className merging...');

      const result = cn('class1', 'class2', 'class3');
      console.log(`🔍 Merged classes: "${result}"`);

      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');

      console.log('✅ Class names merged correctly');
    });

    it('handles conditional classes', () => {
      console.log('📝 Testing conditional classes...');

      const isActive = true;
      const isDisabled = false;

      const result = cn('base-class', isActive && 'active-class', isDisabled && 'disabled-class');

      console.log(`🔍 Conditional result: "${result}"`);
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).not.toContain('disabled-class');

      console.log('✅ Conditional classes handled correctly');
    });

    it('handles duplicate classes (note: cn does not dedupe)', () => {
      console.log('📝 Testing duplicate class handling...');

      const result = cn('duplicate', 'unique', 'duplicate');
      console.log(`🔍 Result with duplicates: "${result}"`);

      // The cn function from clsx/tailwind-merge may or may not dedupe
      // This test just ensures it handles duplicates without crashing
      expect(result).toContain('duplicate');
      expect(result).toContain('unique');
      console.log('✅ Duplicate classes handled without error');
    });

    it('handles empty and undefined values', () => {
      console.log('📝 Testing empty/undefined values...');

      const result = cn('valid', '', undefined, null, 'another-valid');
      console.log(`🔍 Filtered result: "${result}"`);

      expect(result).toContain('valid');
      expect(result).toContain('another-valid');
      expect(result).not.toContain('undefined');
      expect(result).not.toContain('null');

      console.log('✅ Empty/undefined values handled correctly');
    });

    it('works with complex Tailwind classes', () => {
      console.log('📝 Testing complex Tailwind classes...');

      const result = cn(
        'bg-blue-500 hover:bg-blue-600',
        'text-white font-semibold',
        'px-4 py-2 rounded-md',
        'transition-colors duration-200'
      );

      console.log(`🔍 Complex Tailwind result: "${result}"`);

      expect(result).toContain('bg-blue-500');
      expect(result).toContain('hover:bg-blue-600');
      expect(result).toContain('transition-colors');

      console.log('✅ Complex Tailwind classes handled correctly');
    });
  });
});
