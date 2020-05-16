import minimist from 'minimist';

// 実行時引数の定義
const definition: minimist.Opts = {
  string: ['time', 'nest'],
  boolean: ['line'],
  alias: {
    l: 'line',
    t: 'time',
    n: 'nest',
    T: 'test',
  },
  default: {
    line: false,
    time: '300000', // 直近5分
    nest: '2', // 同時実行数：2
    test: false,
  },
};

// パース後の型
interface ExecArgs {
  _: string[];
  l: boolean;
  t: string;
  n: string;
  T: boolean;
  line: boolean;
  time: string;
  nest: string;
  test: boolean;
}

export default function parseArgs(
  argv: string[]
): ExecArgs & minimist.ParsedArgs {
  return minimist<ExecArgs>(argv, definition);
}
