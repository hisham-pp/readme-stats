# Contributing

Contributions are always welcome!

## How to Contribute

1. Fork the project
2. Create a feature branch (\git checkout -b feature/AmazingFeature\)
3. Commit your changes (\git commit -m 'Add some AmazingFeature'\)
4. Push to the branch (\git push origin feature/AmazingFeature\)
5. Open a Pull Request

## Adding a new Badge/Icon

If you want to add a new technology to the marquees:

1. Add the SVG icon to \public/icons/\.
2. Update \src/lib/techConfig.json\ with the new entry's color and gradient definitions.
3. Run `pnpm run badges:generate` to automatically generate the colored badge version.
4. Add the mapping to \src/lib/techs.ts\.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
