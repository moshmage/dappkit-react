import {act, renderHook} from "@testing-library/react";
import {useDappkit} from "../../custom-hooks/use-dappkit";

const Provider = () => jest.fn().mockImplementation(() => ({
  on: jest.fn(),
  hasOwnProperty: jest.fn().mockReturnValue(true),
  disconnect: jest.fn(),
}))

jest.mock('@taikai/dappkit', () => ({
  Web3Connection: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    connect: jest.fn().mockResolvedValue(Promise.resolve()),
    getAddress: jest.fn().mockResolvedValue(Promise.resolve('0x1234567890abcdff')),
    getETHNetworkId: jest.fn().mockResolvedValue(Promise.resolve(1)),
  })),
}));

jest.mock("web3-core", () => ({
  Provider,
}));


describe("useDappkit store", () => {
  it("sets provider correctly", async () => {
    const mockProvider = Provider();
    const { result } = renderHook(() => useDappkit());
    await act(() => result.current.setProvider(mockProvider as any));

    expect(result.current.provider).toBe(mockProvider);
    expect(result.current.connection).toBeTruthy(); // Mocked connection
    expect(result.current.address).toBe('0x1234567890abcdff');
    expect(result.current.chainId).toBe(1);
  });

  it("disconnects provider correctly", async () => {
    const mockProvider = Provider();
    const { result } = renderHook(() => useDappkit());

    await act(async () => result.current.setProvider(mockProvider as any));
    expect(result.current.provider).toBe(mockProvider);

    act(() => result.current.disconnect());

    expect(result.current.provider).toBeNull();
    expect(result.current.connection).toBeNull();
  });
});